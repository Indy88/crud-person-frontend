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
  person: IPerson;
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

  totalRecords: number;
  clonedPerson: { [personData: string]: IPerson; } = {};

  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute ) { }


  ngOnInit(): void {
     this.loadTable();
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
    this.submitted = true;
    this.personDialog = true;
  }

  onRowEditInit(person: IPerson): void  {
    this.clonedPerson[person.fullname] = { ...person };
  }

  onRowEditSave(person: IPerson): void  {
    console.log('Row edit saved');
    this.personService.updateBook(person)
      .subscribe( data => {
        this.ngOnInit();
        alert("Book Updated successfully.");
      });
  }

  onRowEditCancel(person: IPerson, index: number): void {
    console.log('Row edit cancelled');
    this.personList[index] = this.clonedPerson[person.fullname];
    delete this.clonedPerson[person.fullname];
  }

  deletePerson(person: IPerson) {
    console.log('Book Deleted');
    this.personService.deletePerson(person)
      .subscribe( data => {
        this.ngOnInit();
        alert("Book Deleted successfully.");
      });

  }

  hideDialog(): void {
    this.personDialog = false;
  }

  gotoMaps(): void {
    this.router.navigate(['maps'], {relativeTo: this.activeRoute});

  }

}
