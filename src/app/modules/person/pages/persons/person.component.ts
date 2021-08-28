import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Gender, IPerson} from '../../../../models/person-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, ConfirmationService} from 'primeng-lts/api';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {DatePipe} from '@angular/common';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PersonComponent implements OnInit {

  page = 0;
  size = 10;
  order = 'fullname';
  asc = true;

  isFirst = false;
  isLast = false;

  personList: IPerson[];
  personDialog: boolean;
  person: IPerson;
  submitted: boolean;
  loading: boolean;
  cols = [
    { field: 'fullname', header: 'FullName' },
    { field: 'cpf', header: 'CPF' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'sex', header: 'Sex', filter: true, type: 'text'},
    { field: 'datebirth', header: 'Birthdate', filter: true, type: 'date'}
  ];

  selectedGender: Gender;
  genders: Gender[] = [
    {name: 'Female', code: true},
    {name: 'Male', code: false},
  ];

  genderOptions = [
    {label: 'Female', value: true},
    {label: 'Male', value: false}];

  maxDate: Date;
  totalRecords: number;
  editing = false;

  label = {color: 'yellow', text: 'Is Here'};
  position = {
    lat : 42.8582171, // 42.858217  //-82.3589631
    lng : -70.929990,  // -70.929990  //  23.135305
  };

  options = { types: [], };
  autocomplete: any;
  located = true;
  showMap = false;

  @ViewChild('placesRef')placesRef: GooglePlaceDirective;
  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
     this.loadTable();
     this.maxDate = new Date();
  }

  selectDate(event): void{
    console.log(event);
  }

  /*Fill Table*/
  async loadTable() {
    await this.personService.getAllPerson(this.page, this.size, this.order, this.asc).then((data: any) => {
      this.personList = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
    });

    this.totalRecords = this.personList.length;
  }

 /*** Add Person*/
  onAdd(): void {
    this.person = {
      created_at: new Date(), updated_at: new Date(),
      latitude: null, longitude: null,
      address: '',
      city: '',
      codeNumber: undefined,
      neighborhood: '',
      cpf: undefined , datebirth: new Date() , email: '', fullname: '', sex: undefined};

    this.submitted = false;
    this.personDialog = true;
    this.showMap = true;
    this.setCurrentLocation();
  }


  /***Save Person*/
  async onSavePerson() {
    this.submitted = true;
    if (this.validPerson()) {
      if (!this.editing) {
        this.person.latitude = this.position.lat;
        this.person.longitude = this.position.lng;
        await this.personService.addPerson(this.person);
        this.hideDialog();
        this.messageService.add({severity: 'success', summary: 'Sucess', detail: 'Person Added Sucessfully'});

      } else {
        this.person.updated_at = new Date();
        await this.personService.updatePerson(this.person);
        this.loadTable();
        this.messageService.add({severity: 'success', summary: 'Sucess', detail: 'Person Updated Sucessfully'});
        this.hideDialog();
      }
    }
  }

  validPerson(): boolean {
    if (this.person.fullname !== '' &&  String(this.person.cpf).length === 11
      && this.person.datebirth !== null && this.person.address !== '' && this.person.sex !== undefined
      && this.person.city !== '' && this.person.neighborhood !== ''){
      return  true;
    } else {
      return  false;
    }
  }



  onSelectGender(event): void{
    this.person.sex = event.value.code;
  }


  onEditRow(person): void  {
    this.person = { ...person };
    this.person.datebirth = new Date(person.datebirth) ;
    this.personDialog = true;
    this.person.sex ? this.selectedGender = this.genders[0] : this.selectedGender = this.genders[1];
    this.editing = true;
    this.setPosition(this.person.latitude, this.person.longitude);
    this.showMap = true;
  }


  deletePerson(person: IPerson): void {
      this.confirmationService.confirm({
        message: 'Do you want delete this record?',
        accept: async () => {
          await this.personService.deletePerson(person.id);
          this.loadTable();
          }
      });
  }

   handleAddressChange(address: Address): void {
   this.setPosition( address.geometry.location.lat(),  address.geometry.location.lng());
   address.formatted_address !== null ? this.person.address =  address.formatted_address : this.person.address =  address.name;
  }



   setCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(position1 => {
      this.setPosition(position1.coords.latitude, position1.coords.longitude);
      this.located = true;
    });
  }

  hideDialog(): void {
    this.personDialog = false;
    this.editing = false;
    this.loadTable();
    this.selectedGender = null;
    this.showMap = false;
  }

  setPosition(lat, lng: number): void{
    this.position.lat = lat;
    this.position.lng = lng;
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }

  async onDateSelect(value) {
    const birthDate = this.formatDate(value);
    await this.personService.findByIdDateBirth(new Date(birthDate), this.page, this.size).then((data: any) => {
      this.personList = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
    });
  }

  filterbySex(event): void{
    if (event.value == null){
      this.loadTable();
    } else {
       this.personService.findByIdSex(event.value, this.page, this.size).then((data: any) => {
       this.personList = data.content;
       this.isFirst = data.first;
       this.isLast = data.last;
     });
    }
  }


  async search(value){
    if (value !== ''){
      await this.personService.findByName(value, this.page, this.size).then((data: any) => {
        this.personList = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
      });
    }else  {
      this.loadTable();
    }

  }

  clearFilterDate($event){
    this.loadTable();
  }


}
