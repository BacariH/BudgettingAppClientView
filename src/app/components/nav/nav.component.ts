import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private modalService: BsModalService, private fb: FormBuilder, private userService: UserService) {}

  modalRef?: BsModalRef;
  userForm!: FormGroup;
  createdUser$!: User;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: '',
      amountStart: 10
    });
  }

  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createUser(userForm: FormGroup){
     this.createdUser$ = {
      userName: userForm.controls['userName'].value,
      amountStart: userForm.controls['amountStart'].value,
      transactionHistories: [
        {
          createdTransaction: new Date(),
          amountOfTransaction: userForm.value.amountStart,
          transactionDescription: "Debit",
          transactionType: "Initial Savings"
        }
      ]
    }
    
   this.userService.addNewUser(this.createdUser$).subscribe(
     (res)=> {
      console.log(res);
      // TODO: See if you can use rxjs BehaviorSubject, Subject, or ReplaySubject to subscribe to the data so you dont have to use the reloadPage method
      this.reloadPage();
     }
   );
  }
  
  reloadPage(){
    this.modalRef?.hide();
    window.location.reload();
  }
 

}
