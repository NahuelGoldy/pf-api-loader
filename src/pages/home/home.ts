import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Parque } from '../../domain/parque';
import { ApiService } from '../../services/api.service';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  parqueSeleccionado: Parque = new Parque();
  lat: string = "0";
  lng: string = "0";

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public loadingCtrl: LoadingController, private apiService: ApiService, public sharedService: SharedService) {

  }

  clearFields(f) {
    this.parqueSeleccionado = new Parque();
    this.lat = "0";
    this.lng = "0";
    f.form.reset();
  }

  onSetClicked() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 3000 //timeout por si no carga, para que no mate a la aplicacion
    });

    loader.present().then(() => {
      this.geolocation.getCurrentPosition().then(res => {
        this.lat = res.coords.latitude.toString();
        this.parqueSeleccionado.posicionLatitud = res.coords.latitude;
        this.lng = res.coords.longitude.toString();
        this.parqueSeleccionado.posicionLongitud = res.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  onGuardarClicked(f) {
    //muestro un loader mientras se envia a la API el json
    let loader = this.loadingCtrl.create({
      content: "Enviando datos al servidor...",
      duration: 3000
    });
    loader.present().then(() => {

      this.apiService.post('parques', this.parqueSeleccionado).subscribe(
        json => {
          // si me devuelve el json con el parque que le POSTee es porque se guardo correctamente
          // entonces, lo encolo en la lista de parques
          this.sharedService.pushParque(this.parqueSeleccionado);
          this.clearFields(f);
        });
      });
  }
}
