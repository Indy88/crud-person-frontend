import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../services/person.service';
import {IPerson} from '../../../../models/person-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [MessageService]
})
export class PersonComponent implements OnInit {

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
    { field: 'sex', header: 'Sex', setFilter: true, type: 'text'},
    { field: 'datebirth', header: 'Birthdate', setFilter: true, type: 'date'}
  ];

  gender = [
    {name: 'Female', code: true},
    {name: 'Male', code: false},
  ];
  personForm: FormGroup;
  invalidDates: Array<Date>;
  maxDate: Date;
  totalRecords: number;
  clonedPerson: { [personData: string]: IPerson; } = {};
  editing = false;

  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private activeRoute: ActivatedRoute ) { }


  ngOnInit(): void {
     this.loadTable();
     this.maxDate = new Date();
  }


  createForm(person?: any): FormGroup {
    if (person !== undefined) {
      return this.formBuilder.group({
        fullname: [person.name, Validators.required],
        cpf: [person.lastname, Validators.required],
        datebirth: [person.username, Validators.required],
        email: [person.email, Validators.email],
        phone: [person.phone],
        sex: [person.sex],
        description: [''],
        id: [person.id]
      });
    } else {
      return this.formBuilder.group({
        fullname: ['', Validators.required],
        cpf: ['', Validators.required],
        datebirth: ['', Validators.required],
        email: ['', Validators.required],
        phone: [''],
        sex: [''],
        description: [''],
        id: ['']
      });
    }
  }

  /*Fill Table*/
  loadTable(): void{
    this.personService.getAllPerson()
      .then((data) => {
        this.personList = data;
        this.totalRecords = this.personList.length;
      });

  }

  onAdd(): void {
    this.person = {
      // address: '',
      // city: '',
      // codeNumber: '',
      // neighborhood: '',
      cpf: undefined , datebirth: new Date(), email: '', fullname: '', sex: false};

    this.submitted = false;
    this.personDialog = true;
  }

  onSavePerson(): void {
    this.submitted = true;
    if (this.validPerson()) {
      if (!this.editing){
        this.personService.addPerson(this.person).toPromise().then((data) => {
          console.log(data);
          // this.hideDialog()
        });
      } else {
        this.personService.updatePerson(this.person)
          .subscribe( data => {
            this.ngOnInit();
            alert('Person Updated successfully.');
          });
        this.hideDialog()
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


  onEditRow(person: IPerson): void  {
    this.editing = true;
    // this.clonedPerson[person.fullname] = { ...person };
    this.person = { ...person };
    this.personDialog = true;
  }

  deletePerson(person: IPerson): void {
    this.personService.deletePerson(person.id).subscribe( (res: any) => {
      console.log(res);
      this.ngOnInit();
    });
  }

  hideDialog(): void {
    this.personDialog = false;
    this.editing = false;
  }

  gotoMaps(): void {
    this.router.navigate(['maps'], {relativeTo: this.activeRoute});
  }

}
