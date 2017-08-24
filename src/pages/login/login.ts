import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Credentials} from '../../domain/credentials';
import {ApiService} from '../../services/api.service';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciales: Credentials = new Credentials();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLoginClicked(f) {

    this.apiService.loginPost('login', this.credenciales)
      .map((response: Response) => {
        if (response.json()['token']) { //si la Response tiene un atributo "token" es porque el login fue exitoso

          this.apiService.token = response.json()['token'];
          this.apiService.useJwt(); //seteo el token como "Authorization" en los futuros headers

          this.navCtrl.setRoot(TabsPage); //seteo la nueva root page
          f.form.reset();
        }
      }).first().toPromise();

  }
}
