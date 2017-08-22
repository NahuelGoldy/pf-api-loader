import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ApiService {
  // server URL
  //TODO cambiar la URL de la API
  private baseURL = 'http://dondeestaciono.cloudapp.net:8080/';

  //
  // HEADERS
  //

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  //
  // constructor
  //

  constructor(private http: Http) {
  }

  private getJson(response: Response) {
    if (response.status === 204) {
      return '';
    }
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response;
    throw error;
  }

  public post(path: string, body): Observable<any> {
    return this.http
      .post(
        `${this.baseURL}${path}`, JSON.stringify(body),
        {headers: this.headers})
      .map(this.checkForError)
      .catch( err => {
        return Observable.throw(err);
      })
      .map(this.getJson);
  }
}
