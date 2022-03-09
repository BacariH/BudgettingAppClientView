import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }
  users!: User[];
  specificUser!: any;

  ngOnInit(): void {
    this.loadUsers();
  
  }

  loadUsers(){
    this.userService.getUsers().subscribe(
      returnedUsers => {
        this.users = returnedUsers;
        console.log(this.users);
      },
      error => {
        console.log(error.message);
      }
    )
  }

  getUser(userId: number){
    //if we find the user with the specific id. we set that users value as specific user to be passed down to the child component
     this.specificUser = this.users.find(user => user.id === userId + 1);
     console.log(this.specificUser);
  }

  addNewTransaction(){
    
  }

}
