import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ArtistResponse } from "../../interfaces/artist-response.interface";
import {SongResponse} from "../../interfaces/song-response.interface";
import {AlbumResponse} from "../../interfaces/album-response.interface";
import {DataService} from "../../data.service";
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

    constructor(public dialog: MatDialog, private searchService: DataService) {
    }

    albums: AlbumResponse[];
    songs: SongResponse[];
    showAlbum: boolean = false;
    isFavorite: boolean;

    ngOnInit(): void {
        this.searchService.isFavorite(this.artist._id).subscribe(isFavorite => {
            this.isFavorite = isFavorite;
        });
    }

    @Input() artist: ArtistResponse;


    getAlbums(albums): Observable<AlbumResponse[]> {
        return this.searchService.getAlbumsByIds(albums);
    }
    getSongs(songs): Observable<SongResponse[]> {
        return this.searchService.getSongsByIdsWithAlbums(songs);
    }

    openDialog(dialog) {
        this.showAlbum = dialog === "albums";
        this.getSongs(this.artist.songs).subscribe(songs => {
            this.songs = songs;
            this.getAlbums(this.artist.albums).subscribe(albums => {
                this.albums = albums;
                this.searchService.updateSearchHistory("artist", this.artist._id);
                const dialogRef = this.dialog.open(DialogComponent, {
                    height: "80%",
                    width: "70%",
                    data: [this.artist, this.albums, this.songs, this.showAlbum],
                });
                dialogRef.afterClosed();
            });
        });
    }

    favorite() {
        if (this.isFavorite)
            this.searchService.removeFavoriteArtist(this.artist._id).subscribe();
        else
            this.searchService.addFavoriteArtist(this.artist._id).subscribe();
        this.isFavorite = !this.isFavorite;
    }

}
