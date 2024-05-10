import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from 'src/app/common/models/Api-response';
import {Apartment} from 'src/app/common/models/Apartment';
import {BehaviorSubject} from 'rxjs';
import {environment} from 'src/environment/environment';
import {LocalStorageService} from 'src/app/common/services/local-storage.service';
import {getHttpParamsFromLocalStorage} from 'src/app/utils/getHttpParamsFromLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments$ = new BehaviorSubject<Apartment[]>([]);
  public amount: number;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  public getApartments() {

    const params = getHttpParamsFromLocalStorage(this.localStorage);

    this.http.get<ApiResponse<Apartment>>(`${environment.apiUrl}/apartments`, {params})
      .subscribe(res => {
        this.amount = res.amount;
        this.apartments$.next(res.data);
      });

    return this.apartments$.asObservable();
  }

  public createApartment(apartment: Apartment) {
    return this.http.post(`${environment.apiUrl}/apartments`, apartment);
  }

  public deleteApartment(id: string) {
    return this.http.delete(`${environment.apiUrl}/apartments/${id}`);
  }
}
