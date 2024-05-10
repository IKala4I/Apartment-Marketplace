import {LocalStorageService} from 'src/app/common/services/local-storage.service';
import {HttpParams} from '@angular/common/http';

export const getHttpParamsFromLocalStorage = (localStorage: LocalStorageService) => {
  const paramsObject: { [key: string]: string } = {};

  if (localStorage.getData('price')) {
    paramsObject['price'] = localStorage.getData('price') as string;
  }

  if (localStorage.getData('rooms')) {
    paramsObject['rooms'] = localStorage.getData('rooms') as string;
  }

  return new HttpParams({fromObject: paramsObject});
};
