import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {GoogleMapsModule} from '@angular/google-maps';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';




const PRIME_MODULE = [
  InputTextModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  TableModule,
  ButtonModule,
  DialogModule,
  GoogleMapsModule,
  RadioButtonModule,
  InputMaskModule,
  DropdownModule,
  CalendarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIME_MODULE
  ],
  exports: [PRIME_MODULE]
})
export class PrimeNGModule { }
