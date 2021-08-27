import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PersonComponent} from './pages/persons/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from './services/person.service';
import { AgmCoreModule } from '@agm/core';
// import { GoogleMapsModule} from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {LocateComponent} from './pages/locate/locate.component';
import {PrimeNGModule} from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    PersonComponent,
    LocateComponent
  ],
    imports: [
        PersonRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule,
        GooglePlaceModule,
        AgmCoreModule.forRoot( {apiKey: 'INSERT_API_kEY',
                            libraries: ['places', 'geometry']
        }),
    ],
  providers: [
    PersonService,
    DatePipe,
  ]
})
export class PersonModule { }
