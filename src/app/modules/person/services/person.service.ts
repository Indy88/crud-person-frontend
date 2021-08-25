import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {IPerson} from '../../../models/person-entity';


@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer'
    } ), responseType: 'text' as 'json'
  };

  addPerson(person: IPerson): Observable<any> {
    person.datebirth.toDateString();
    const url = `${environment.API_TRACK}/api/v1/person/add`;
    return this.http.post<any>(url, person, this.httpOptions);
    // return this.http.post<any>(ur, person
  }

  getAllPerson(): any {
    return this.http.get<IPerson[]>(`${environment.API_TRACK}/api/v1/person/allPerson`).toPromise();
    }

  updatePerson (person) {
    return this.http.put<IPerson>(`${environment.API_TRACK}/api/v1/person/update`, person);
  }

  deletePerson(id): Observable<any> {
    return this.http.delete<any>(`${environment.API_TRACK}/api/v1/person/delete/` + id,  this.httpOptions);
  }

  findById(id): Observable<any>{
    return this.http.get(`${environment.API_TRACK}/api/v1/person/findById/` + id, this.httpOptions);
  }


}
