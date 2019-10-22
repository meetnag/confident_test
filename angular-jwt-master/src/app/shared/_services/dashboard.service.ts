import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OcModel, Customer } from '../_models/oc-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  currentOcObj: BehaviorSubject<OcModel> = new BehaviorSubject<OcModel>(null);
  selectedObj: BehaviorSubject<OcModel> = new BehaviorSubject<OcModel>(null);
  constructor(private apiService: ApiService, private http: HttpClient) { }
  getSubAssemblyList() {
    return this.apiService.apiCaller('get', 'subAssembly/');
  }
  getProductList() {
    return this.apiService.apiCaller('get', 'products/');
  }
  getSpareList() {
    return this.apiService.apiCaller('get', 'spare/');
  }
  getBranchList() {
    return this.apiService.apiCaller('get', 'branch/');
  }
  getStateList() {
    return this.apiService.apiCaller('get', 'state/');
  }
  getCountryList() {
    return this.apiService.apiCaller('get', 'country/');
  }
  getPriorityList() {
    return this.apiService.apiCaller('get', 'priority/');
  }
  getCustomersByName(name): Observable<Array<Customer[]>> {
    return this.http.post(environment.apiUrl + 'ocList/getCustomersByName', name)
      .map((response: any) => {
        if (response.status === "success" && response.data) {
          console.log('res', response.data)
          return response.data;
        } else {
          return [];
        }
      });
    // return this.apiService.apiCaller('post', 'ocList/getCustomersByName', name).map((response: any) => {
    //   if (response.status === "success" && response.data) {
    //     console.log('res',response.data)
    //     return response.data;
    //   } else {
    //     return [];
    //   }
    // });;
  }
  getCustomerTypeList() {
    return this.apiService.apiCaller('get', 'customerType/');
  }
  addOc(ocObj) {
    return this.apiService.apiCaller('post', 'ocList/create', ocObj);
  }
  updateOc(ocObj) {
    return this.apiService.apiCaller('post', 'ocList/updateByOCId', ocObj);
  }
  getOcNumber() {
    return this.apiService.apiCaller('get', 'ocList/getOcNumber');
  }
  checkOcNumber(id) {
    return this.apiService.apiCaller('get', 'ocList/checkOCNumber/' + id);
  }
  getOcList(obj) {
    return this.apiService.apiCaller('post', 'ocList/', obj);
  }
  getOcArchives(obj) {
    return this.apiService.apiCaller('post', 'ocList/getOCArchieves', obj);
  }
  getOcByNumber(obj) {
    if (obj.qrCode)
      return this.apiService.apiCaller('post', 'scanOcList/getByOCNumber', obj);
    else
      return this.apiService.apiCaller('post', 'ocList/getByOCNumber', obj);
  }
  uploadDocument(doc) {
    return this.apiService.apiCaller('post', 'ocDocument/save', doc);
  }
  deleteDocument(id) {
    return this.apiService.apiCaller('get', 'ocDocument/deleteDocument/' + id);
  }
  getDocument(id) {
    return this.apiService.apiCaller('post', 'ocDocument/getByOcId', id);
  }
  onStatusChange(obj) {
    return this.apiService.apiCaller('post', 'ocList/updateStatus', obj);
  }

  downloadDocument(obj) {
    return this.apiService.apiCaller('get', 'ocDocument/downlaod/' + obj, '', true);
  }
}
