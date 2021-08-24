import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {PersonService} from '../../services/person.service';
import {IPerson} from '../../../../models/person-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  personList: IPerson[];
  personDialog: boolean;
  person: IPerson = {fullname: '', cpf: 0, datebirth: new Date(), sex: '', email: ''};
  submitted = false;
  cols = [
    { field: 'fullname', header: 'FullName' },
    { field: 'cpf', header: 'CPF' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' }
  ];

  gender = [
    {name: 'Female', code: 'F'},
    {name: 'Male', code: 'M'},
  ];

  invalidDates: Array<Date>;
  maxDate: Date;
  totalRecords: number;
  clonedPerson: { [personData: string]: IPerson; } = {};

  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute ) { }


  ngOnInit(): void {
     this.loadTable();
     const today = new Date();
     this.maxDate = today;

     /*const invalidDate = new Date();
     invalidDate.setDate(today.getDate() - 1);
     this.invalidDates = [today, invalidDate];*/
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
    this.person = {};
    this.submitted = false;
    this.personDialog = true;
  }

  onSavePerson(): void{
    this.submitted = true;
    if (this.validtePerson(this.person.cpf)){

     }
  }


  validtePerson(id): boolean {
    let valid = true;
    this.personService.findById(id).then(
      (data) => {
      if (data != null){
        valid = false;
        }
      return valid;
      });
    return valid;
  }
  onRowEditInit(person: IPerson): void  {
    this.clonedPerson[person.fullname] = { ...person };
  }

  onRowEditSave(person: IPerson): void  {
    console.log('Row edit saved');
    this.personService.updateBook(person)
      .subscribe( data => {
        this.ngOnInit();
        alert('Book Updated successfully.');
      });
  }

  onRowEditCancel(person: IPerson, index: number): void {
    console.log('Row edit cancelled');
    this.personList[index] = this.clonedPerson[person.fullname];
    delete this.clonedPerson[person.fullname];
  }

  deletePerson(person: IPerson): void {
    this.personService.deletePerson(person.id).then(
      (data) =>{
         console.log(data);
           this.ngOnInit();
      });
      /*.subscribe( data => {
        this.ngOnInit();
        alert('Book Deleted successfully.');
      });*/

  }

  hideDialog(): void {
    this.personDialog = false;
  }

  gotoMaps(): void {
    this.router.navigate(['maps'], {relativeTo: this.activeRoute});

  }

}
