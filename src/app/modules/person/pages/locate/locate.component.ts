import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.css']
})
export class LocateComponent implements OnInit {

  constructor( private router: Router,
               private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }


  backToPersons(): void {
    this.router.navigate(['']);
  }

}
