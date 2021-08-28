import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Gender, IPerson} from '../../../../models/person-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, ConfirmationService} from 'primeng-lts/api';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {DatePipe} from '@angular/common';
import {Table} from 'primeng/table';
import {Dropdown} from 'primeng/dropdown';



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
    {label: 'Femenino', value: true},
    {label: 'Masculino', value: false}]


  maxDate: Date;
  totalRecords: number;
  // clonedPerson: { [personData: string]: IPerson; } = {};
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
  @ViewChild('dt') table: Table;
  @ViewChild('filterSex') dropGender: Dropdown;

  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private datePipe: DatePipe,
              private activeRoute: ActivatedRoute ) { }


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
  onSavePerson(): void {
    this.submitted = true;
    if (this.validPerson()) {
      if (!this.editing){
        this.person.latitude = this.position.lat;
        this.person.longitude = this.position.lng;
        this.personService.addPerson(this.person).toPromise().then((data) => {
          this.hideDialog();
          this.messageService.add({severity: 'success', summary: 'Sucess', detail: 'Person Added Sucessfully'});
          // this.loadTable();
        });
      } else {
        this.person.updated_at = new Date();
        this.personService.updatePerson(this.person)
          .subscribe( data => {
            this.loadTable();
            this.messageService.add({severity: 'success', summary: 'Sucess', detail: 'Person Updated Sucessfully'});
          });
        this.hideDialog();
      }
    }
  }

  validPerson(): boolean {
    if (this.person.fullname !== '' &&  String(this.person.cpf).length === 11
      && this.person.datebirth !== null ){
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
    // this.selectedGender.code = this.person.sex;
    this.setPosition(this.person.latitude, this.person.longitude);
    this.showMap = true;
  }


  deletePerson(person: IPerson): void {
      this.confirmationService.confirm({
        message: 'Do you want delete this record?',
        accept: () => {
          this.personService.deletePerson(person.id).subscribe( (res: any) => {
            this.loadTable();
          });
        }
      });
  }

   handleAddressChange(address: Address): void {
    this.setPosition( address.geometry.location.lat(),  address.geometry.location.lng() );
    // this.setCurrentLocation();
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

  onDateSelect(value): void {
    this.table.filter(this.formatDate(value), 'date', 'equals');
  }

  filterbySex(value): void{
    if (this.dropGender.selectedOption.value !== undefined){
      let gender =  this.dropGender.selectedOption.value;
      this.personService.findByIdSex(gender, this.page, this.size).then((data: any) => {
        this.personList = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
      });
    }
  }

  close($event){

  }

}
