import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'persons' },
 { path: 'persons', loadChildren: () =>
     import('./modules/person/person.module').then(m => m.PersonModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
