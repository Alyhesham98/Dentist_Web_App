import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // PATIENTS
  addPatient(data: any): Observable<any> {
    return this.http
      .post<any>('https://localhost:44346/api/Patients', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllPatients(): Observable<any> {
    return this.http.get<any>('https://localhost:44346/api/Patients').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPatient(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:44346/api/Patients/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updatePatient(data: any): Observable<any> {
    return this.http
      .put<any>('https://localhost:44346/api/Patients/', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // DISEASES
  getDisease(): Observable<any> {
    return this.http.get<any>('https://localhost:44346/api/Diseases');
  }

  getDiseaseWithId(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:44346/api/Diseases/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addDisease(val: any): Observable<any> {
    return this.http.post('https://localhost:44346/api/Diseases', val);
  }
  updateDisease(val: any): Observable<any> {
    return this.http.put('https://localhost:44346/api/Diseases', val);
  }

  getAllDiseaseName(): Observable<any> {
    return this.http.get<any[]>(
      'https://localhost:44346/api/Diseases/GetAllDataDisease'
    );
  }

  deleteDisease(id: number): Observable<any> {
    return this.http.delete<any[]>(
      'https://localhost:44346/api/Diseases/' + id
    );
  }

  // SUB-DISEASES
  getsubDisease(): Observable<any> {
    return this.http.get<any>('https://localhost:44346/api/SubDiseases');
  }

  addsubDisease(val: any): Observable<any> {
    return this.http.post('https://localhost:44346/api/SubDiseases', val);
  }

  getSubDiseaseWithId(id: number): Observable<any> {
    return this.http.get('https://localhost:44346/api/SubDiseases/' + id);
  }

  getAllSubDiseasesWithId(id: number): Observable<any> {
    return this.http.get(
      'https://localhost:44346/api/SubDiseases/GetAllDataDiseaseByID/' + id
    );
  }

  updatesubDisease(val: any): Observable<any> {
    return this.http.put('https://localhost:44346/api/SubDiseases', val);
  }

  // SESSIONS
  addSession(data: any): Observable<any> {
    return this.http
      .post<any>('https://localhost:44346/api/SessionsData', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getSessions(): Observable<any> {
    return this.http.get('https://localhost:44346/api/SessionsData');
  }

  getSessionsById(id: number): Observable<any> {
    return this.http.get(
      'https://localhost:44346/api/SessionsData/GetAllDiagnosByPatientId/' + id
    );
  }

  // USERS
  getAllUsers(): Observable<any> {
    return this.http.get('https://localhost:44346/api/Users');
  }

  loginUser(data: any): Observable<any> {
    return this.http
      .post('https://localhost:44346/api/UserAccount/authenticate', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  registerUser(data: any): Observable<any> {
    return this.http
      .post('https://localhost:44346/api/UserAccount/Create', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
