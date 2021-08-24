import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonComponent} from './pages/persons/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from './services/person.service';
import { PersonAddUpdateComponent } from './pages/person-add-update/person-add-update.component';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule} from '@angular/google-maps';
import {LocateComponent} from './pages/locate/locate.component';
import {TableModule} from 'primeng/table';
import {PrimeNGModule} from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    PersonComponent,
    PersonAddUpdateComponent,
    LocateComponent
  ],
  imports: [
    PersonRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    // AgmCoreModule
  ],
  providers: [
    PersonService
  ]
})
export class PersonModule { }
