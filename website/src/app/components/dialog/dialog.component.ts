import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlbumResponse} from "../../interfaces/album-response.interface";

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
    show: boolean = false;
    id: string = "";
    album: AlbumResponse;

    displayedColumns = ['', 'Title', 'Album'];
    dataSource = new MatTableDataSource<>();

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public thisDialogRef: MatDialogRef<DialogComponent>) {
	}
	closeDialog() {
		this.thisDialogRef.close();
	}
    intoView(album) {
	    this.album = album;
	    this.show = true;
        document.getElementById("type-dialog").scrollIntoView();
    }
}
