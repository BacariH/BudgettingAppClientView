import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewSpecificUser();
  }

  viewSpecificUser(){
    this.userService.getSpecificUser(this.route.snapshot.paramMap.get('username') || '{}').subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
