import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = 0;
  lng: number = 0;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public loadingCtrl: LoadingController) {

  }

  onSetClicked() {

    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 3000 //timeout por si no carga, para que no mate a la aplicacion
    });

    loader.present().then(() => {
      this.geolocation.getCurrentPosition().then(res => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
}
