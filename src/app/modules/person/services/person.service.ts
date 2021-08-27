import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {IPerson} from '../../../models/person-entity';


@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}
/*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
    })
  };*/


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer'
    } ), responseType: 'text' as 'json'
  };


  addPerson(person: IPerson): Observable<IPerson> {
    // person.datebirth.toDateString();
    return this.http.post<IPerson>(`${environment.API_URL}/person`, person);
  }

  getAllPerson2(): Promise<IPerson[]> {
    return this.http.get<IPerson[]>(`${environment.API_URL}/person`).toPromise();
    }

  getAllPerson(page: number, size: number, order: string, asc: boolean ): Promise<IPerson[]> {
    return this.http.get<any>(`${environment.API_URL}/person?+page=${page}&size=${size}&order=${order}&asc=${asc}`).toPromise();
  }


  updatePerson (person) {
    return this.http.put<IPerson>(`${environment.API_URL}/person`, person);
  }

  deletePerson(id): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/person/${id}`, this.httpOptions);
  }

  findById(id): Observable<any>{
    return this.http.get(`${environment.API_URL}/person/${id}`, this.httpOptions);
  }


}
