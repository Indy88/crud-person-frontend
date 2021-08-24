import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './pages/persons/person.component';
import {LocateComponent} from './pages/locate/locate.component';

const routesPerson: Routes = [
  { path: '',  component: PersonComponent },
  { path: 'maps',  component: LocateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routesPerson)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
