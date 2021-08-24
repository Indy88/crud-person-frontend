import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {IPerson} from '../../../models/person-entity';


@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}

  getAllPerson(): any {
    return this.http.get<IPerson[]>(`${environment.API_TRACK}/api/v1/person/allPerson`).toPromise();
    }

  updateBook(person) {
    return this.http.put<IPerson>("http://localhost:8080/api/books" + "/"+ person.name,person);
  }

  deletePerson(person) {
    return this.http.delete<IPerson>("http://localhost:8080/api/books" + "/"+ person.name);
  }

  /* getCondoByAdmin(managerId: number): Observable<any> {
     return this.http.get(`${environment.API_TRACK}/api/v1/condo/admin/` + managerId);
   }

   create(condoObject: any) {
     return this.http.post(`${environment.API_TRACK}/api/v1/condo` , condoObject);
   }

   update(idCondo: number, condObject: any) {
     return this.http.put(`${environment.API_TRACK}/api/v1/condo/` + idCondo, condObject);
   }*/


}
