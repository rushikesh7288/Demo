import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  isPopupOpened = true;
  dialogConfig = false;
  isEdit  = false;
  users;
  user : [];
  allUser: Object;
  registerForm:any = {
     fullName:'',
     email:'',
     address:'',
     dender:'',
     birthDate:'',
  }
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,    
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,

  ) { }

  ngOnInit() {
  this.getAllUser();
 
  }

  private getAllUser(){
    this.userService.getAllUser().subscribe((res) => {
    this.allUser = res
    console.log(res)
    });
  }

  editUser(user) {
  this.isEdit = true;
  this.registerForm  = user
  this.users = user;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus =true;
  this.dialog.open(EditUserComponent,{
    
  })
  }

  deleteUser(user, name) {
    if (window.confirm('Are you sure to delete: ' + name)) {
    this.userService.deleteUser(user).subscribe(res =>{
     this.getAllUser()
     });
    }
  }
}
