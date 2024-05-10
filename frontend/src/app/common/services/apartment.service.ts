import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from 'src/app/common/models/Api-response';
import {Apartment} from 'src/app/common/models/Apartment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments$ = new BehaviorSubject<Apartment[]>([]);

  url: string = '/assets/apartment.json';
  amount: number;

  constructor(private http: HttpClient) {
  }

  public getApartments() {
    this.http.get<ApiResponse<Apartment>>(this.url).subscribe(res => {
      this.amount = res.amount;
      this.apartments$.next(res.data);
    });

    return this.apartments$.asObservable();
  }
}
