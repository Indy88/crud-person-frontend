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

  addPerson(person: IPerson): Observable<IPerson> {
    person.datebirth.toDateString();
    return this.http.post<IPerson>(`${environment.API_URL}/person`, person, this.httpOptions);
  }

  getAllPerson(): Promise<IPerson[]> {
    return this.http.get<IPerson[]>(`${environment.API_URL}/person`).toPromise();
    }

  updatePerson (person) {
    return this.http.put<IPerson>(`${environment.API_URL}/person`, person);
  }

  deletePerson(id): Observable<any> {
    return this.http.delete(`${environment.API_URL}/person/${id}`,  this.httpOptions);
  }

  findById(id): Observable<any>{
    return this.http.get(`${environment.API_URL}/person/${id}`, this.httpOptions);
  }


}
