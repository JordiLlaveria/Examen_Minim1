import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating';
import { Activity } from '../models/activity';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  url = 'http://localhost:3000/api/ratings';

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.url);
  }

  deleteRating(tittle: string): Observable<string> {
    return this.http.delete(this.url + '/' + tittle, {responseType: 'text'})
  }

  addRatingUser(user: Rating): Observable<string> {
    return this.http.post(this.url + '/ratinguser', user, {responseType: 'text'}) ;
  }

  addRatingActivity(activity: Rating): Observable<string> {
    return this.http.post(this.url + '/ratingactivity', activity, {responseType: 'text'}) ;
  }

  getRatingByName(name: string): Observable<Rating> {
    return this.http.get<Rating>(this.url + '/' + name);
  }

  updateRating(name: string, rating:Rating): Observable<string> {
      return this.http.put(this.url + '/' + name, rating, {responseType: 'text'});
  }
}