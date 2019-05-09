import {Injectable} from '@angular/core';
import {ObjectTypes} from '../model/ObjectTypes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class HTTPTodoServiceService {

  private apiUrl = 'api/BD_HTTP'; // URL to web api // адрес откуда будут приходить данные
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} =FAILED=: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

  constructor( private httpClient: HttpClient ) {}







  /** GET ALL heroes from the server */
  getHeroes (): Observable<ObjectTypes[]> {
    return this.httpClient.get<ObjectTypes[]> (this.apiUrl)
      .pipe(
        tap(_ => this.log('GET ALL heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<ObjectTypes> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ObjectTypes> (url)
      .pipe(
        tap(_ => this.log(`GET ONE hero id=${id}`)),
        catchError(this.handleError<ObjectTypes>(`getHero id=${id}`))
      );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: ObjectTypes): Observable<any> {
    return this.httpClient.put (this.apiUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`UPDATED hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: add a new hero to the server */
  addHero (hero: ObjectTypes): Observable<ObjectTypes> {
    return this.httpClient.post<ObjectTypes> (this.apiUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: ObjectTypes) => this.log(`ADDED HERO w/ id=${newHero.id}`) ),
        catchError( this.handleError<ObjectTypes>('addHero') )
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: ObjectTypes | number): Observable<ObjectTypes> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.apiUrl}/${id}`;

    return this.httpClient.delete<ObjectTypes> (url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`DELETED HERO id=${id}`)),
        catchError(this.handleError<ObjectTypes>('deleteHero'))
      );
  }

}
