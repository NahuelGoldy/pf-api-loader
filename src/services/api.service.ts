import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class ApiService {
  // server URL
  private baseURL = 'http://dondeestaciono.cloudapp.net/';
  private timer: Observable<number>;
  private timerSubscription: Subscription;

  token: string;

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

  public loginPost(path: string, body): Observable<any> {
    return this.http
      .post(
        `${this.baseURL}${path}`, JSON.stringify(body),
        {headers: this.headers})
      .map(this.checkForError)
      .map((response) => {
        this.startRefresh(false);
        return response;
      })
      .catch(err => Observable.throw(err));
  }

  useJwt() {
    if (!isNullOrUndefined(this.token)) {
      this.headers.set('Authorization', 'Bearer ' + this.token);
    }
  }

  private startRefresh(startInmediately: Boolean = false) {
    if (!isNullOrUndefined(this.timerSubscription)) {
      this.timerSubscription.unsubscribe();
    }
    if (startInmediately) {
      this.refreshToken();
    }
    // refrescar el token cada 25 mins mientras la aplicación esté activa
    this.timer = Observable.timer(1000 * 60 * 25, 1000 * 60 * 25);
    this.timerSubscription = this.timer.subscribe(() => {
      this.refreshToken();
    });
  }

  private refreshToken() {
    this.useJwt();
    if (!isNullOrUndefined(this.token)) {
      this.http.post(this.baseURL + 'refresh', '', {headers: this.headers})
        .map(this.checkForError)
        .catch( err => {
          this.checkForError(err)
          return Observable.throw(err);
        })
        .subscribe( (response: Response) => {
          this.token = response.json()['token'];
        });
    }
  }
}
