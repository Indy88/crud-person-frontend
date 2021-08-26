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
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import { CardModule, } from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';

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
        TableModule,
        CalendarModule,
        CardModule,
        InputTextModule
        // AgmCoreModule
    ],
  providers: [
    PersonService
  ]
})
export class PersonModule { }
