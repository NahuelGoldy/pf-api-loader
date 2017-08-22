import {Injectable} from '@angular/core';
import {Parque} from '../domain/parque';

@Injectable()
export class SharedService {

  parks: Parque[];

  constructor() {
    this.parks = [];
  }

  pushParque(parque: Parque) {
    this.parks.push(parque);
  }

  getParques() {
    return this.parks;
  }

}
