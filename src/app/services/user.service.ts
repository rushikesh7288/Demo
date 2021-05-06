import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUserById(id) {
    return this.http.get("http://localhost:3000/users/" + id );
  }

  createUser(user) {
    return this.http.post("http://localhost:3000/users",user);
  }
  getAllUser() {
    return this.http.get("http://localhost:3000/users");
  }
 updateUser(user) {
  return this.http.put("http://localhost:3000/users/" + user.id,user);
  }
  deleteUser(user) {
    return this.http.delete("http://localhost:3000/users/" + user.id );
  }
}
