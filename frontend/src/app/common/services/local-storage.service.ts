import {Injectable} from '@angular/core';
import {WindowService} from 'src/app/common/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private windowService: WindowService) {
  }

  public saveData(key: string, data: string) {
    this.windowService.window?.localStorage.setItem(key, data);
  }

  public deleteData(key: string) {
    this.windowService.window?.localStorage.removeItem(key);
  }

  public getData(key: string) {
    return this.windowService.window?.localStorage.getItem(key);
  }
}

