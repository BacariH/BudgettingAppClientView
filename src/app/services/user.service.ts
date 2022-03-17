import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseApi: string = environment.baseApi;
  users: User[] = [];

  


  getUsers(): Observable<User[]>{
    if(this.users.length > 0)return of(this.users);

    return this.http.get<User[]>(`${this.baseApi}user`).pipe(
      map( users => {
        this.users = users;
        return users;
      })
    );
  }

  //update user information
  updateUser(user:User){
    this.http.put(`${this.baseApi}user`, user).pipe(
      map(() => {
        const index = this.users.indexOf(user);
        this.users[index] = user;
      })
    );
  }

  //i dont think we need to get it by user but we could get it via routing
  getSpecificUser(username: string){
    // Finds specific user by their username
    const user = this.users.find(userToFind => userToFind.userName === username);
    if(user !== undefined) return of(user);
    return this.http.get<User>(`${this.baseApi}user/${username}`);
  }

  addNewUser(user: User){
    return this.http.post<User>(`${this.baseApi}user/add`, user).pipe(
      map(user => {
        return user;
      })
    )
  }

  // delete user method
  deleteUser(username: string){
   
    return this.http.delete<User>(`${this.baseApi}user/${username}`);

  }

}
