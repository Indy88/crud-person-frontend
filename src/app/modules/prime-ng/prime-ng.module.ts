import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import {CalendarModule} from 'primeng-lts/calendar';
import {ToastModule} from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng-lts/table';
import {CardModule} from 'primeng/card';
// import {ConfirmationService} from 'primeng/api';


const PRIME_MODULE = [
  InputTextModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  TableModule,
  ButtonModule,
  CardModule,
  DialogModule,
  GoogleMapsModule,
  RadioButtonModule,
  InputMaskModule,
  DropdownModule,
  CalendarModule,
  ToastModule,
  FormsModule,
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIME_MODULE,
  ],
  providers: [DatePipe],
  exports: [...PRIME_MODULE]
})
export class PrimeNGModule { }
