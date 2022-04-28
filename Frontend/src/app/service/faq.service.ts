import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  url = 'http://localhost:3000/api/faqs';

  constructor(private http:HttpClient) { }

  getFaqs(): Observable<Faq[]>{
    return this.http.get<Faq[]>(this.url);
  }

  addFaq(faq: Faq): Observable<string>{
    return this.http.post(this.url, faq,{responseType: 'text'});
  }

  deleteFaq(pregunta: string): Observable<string>{
    return this.http.delete(this.url + "/" + pregunta, {responseType: 'text'});
  }
}