import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonComponent} from './pages/persons/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from './services/person.service';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule} from '@angular/google-maps';
import {LocateComponent} from './pages/locate/locate.component';
import {PrimeNGModule} from '../prime-ng/prime-ng.module';
import {StyleClassModule} from 'primeng/styleclass';
import {TableModule} from 'primeng/table';



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
        StyleClassModule,
      TableModule
        // AgmCoreModule
    ],
  providers: [
    PersonService
  ]
})
export class PersonModule { }
