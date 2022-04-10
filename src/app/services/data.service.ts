import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Crypto} from '../models/crypto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = 'http://localhost:8080/api/currencies/';
  dataChange: BehaviorSubject<Crypto[]> = new BehaviorSubject<Crypto[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Crypto[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  // GET METHOD
  getCrypto(): void {
  this.http.get<Crypto[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  } 

  // POST METHOD
  addCrypto(crypto: Crypto): void {
    this.http.post(this.API_URL, crypto).subscribe(data => {
      this.dialogData = crypto;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
    }

  // PUT METHOD
  putCrypto(crypto: Crypto): void {
    this.http.put(this.API_URL + crypto.id, crypto).subscribe(data => {
        this.dialogData = crypto;
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      }
    );
  }

  // DELETE METHOD
  deleteCrypto(id: number): void {
    this.http.delete(this.API_URL + id).subscribe(data => {
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      }
    );
  }
}

const httpOptions = {
  headers: new HttpHeaders({
      'content-type': 'application/json',
  })
};
