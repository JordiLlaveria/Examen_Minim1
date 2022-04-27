import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url);
  }

  getMessagesByReceiver(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/receiver/' + id);
  }

  getMessagesByActivity(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/activity/' + id);
  }

  deleteMessage(id: string): Observable<string> {
    return this.http.delete(this.url + '/' + id, {responseType: 'text'})
  }

  addMessageUserByName(message: Message): Observable<string> {
    return this.http.post(this.url + '/user', message, {responseType: 'text'});
  }

  addMessageActivityByName(message: Message): Observable<string> {
    return this.http.post(this.url + '/activity', message, {responseType: 'text'});
  }
}
