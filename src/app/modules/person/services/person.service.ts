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


  addPerson(person: IPerson): Promise<IPerson> {
    return this.http.post<IPerson>(`${environment.API_URL}/person`, person).toPromise();
  }

  updatePerson(person: IPerson): Promise<IPerson>  {
    return this.http.put<IPerson>(`${environment.API_URL}/person`, person).toPromise();
  }

  getAllPerson(page: number, size: number, order: string, asc: boolean ): Promise<IPerson[]> {
    return this.http.get<any>(`${environment.API_URL}/person?+page=${page}&size=${size}&order=${order}&asc=${asc}`).toPromise();
  }


  deletePerson(id): Promise<IPerson>{
    return this.http.delete<any>(`${environment.API_URL}/person/${id}`, this.httpOptions).toPromise();
  }

  findByIdSex(gender, page: number, size: number): Promise<IPerson[]>{
    return this.http.get<any>(`${environment.API_URL}/person/filterSex/${gender}?+page=${page}&size=${size}`).toPromise();
  }

  findByIdDateBirth(date, page: number, size: number): Promise<IPerson[]>{
    return this.http.get<any>(`${environment.API_URL}/person/filterDate/${date}?+page=${page}&size=${size}`).toPromise();
  }



}
