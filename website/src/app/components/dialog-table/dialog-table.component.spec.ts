import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogTableComponent} from './dialog-table.component';
import {MatDialogModule, MatTableModule} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {DataService} from '../../data.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SongResponse} from '../../interfaces/song-response.interface';

class MockDataService {
    public getSongsByIds(): Observable<SongResponse[]> {
        return Observable.of([]);
    }
}

describe('DialogTableComponent', () => {
    let component: DialogTableComponent;
    let fixture: ComponentFixture<DialogTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogTableComponent],
            imports: [MatDialogModule, MatTableModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: DataService, useClass: MockDataService}, HttpHandler, HttpClient]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
