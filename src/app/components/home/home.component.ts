import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private modalService: BsModalService, private fb: FormBuilder) { }
  users!: User[];
  specificUser!: any;
  transactionForm!: FormGroup;
  modalRef?: BsModalRef;
  transForm!: HTMLFormElement;

  // TODO: Fill in the options for transactionDesc and transactionType
  transactionDescriptions = ['a', 'b', 'c'];
  transactionType: string[] = ['DEBIT', 'CREDIT'];
  updateUser!: User;


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

  getUser(username: string){
    //if we find the user with the specific id. we set that users value as specific user to be passed down to the child component
     this.specificUser = this.users.find(user => user.userName === username);
  }

  deleteUserData(username: string){
    this.userService.deleteUser(username).subscribe(
      data => {
        console.log(`User with the name ${username} has been deleted`);
        // a way to reload the page after deleting a user form the server
        window.location.reload();
      },
      error => {
        console.log(error.message);
      }
    );
  }

  openUserEdit(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);

    //have to get access to the specific user and their information
    


  }

  openModal(template: TemplateRef<any>){
  }

  // TODO: update this method to call to the api to update user transactions
  addNewTransaction(userTransactionForm: FormGroup){
    //Have to get the data from the specific form user
    console.log()
  
  }

  
}
