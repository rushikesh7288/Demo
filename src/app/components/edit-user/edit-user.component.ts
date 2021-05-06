import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm : any;
  editFormSubmitted = false;
  user;

  registerForm ={
    fullName:'',
    email:'',
    address:'',
    dender:'',
    birthDate:'',
  };
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.createForm();
   
  
  }

  createForm() {
    const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],     
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(patternEmail)]],      
      birthDate: ['', Validators.required],
    
    });
  }

  get ef() { return this.editForm.controls }

  updateUser(){
    this.editFormSubmitted = true;
 this.userService.updateUser(this.editForm.value).subscribe(res =>{

 })
  }
   closeDialog(): void { 
      this.dialog.closeAll();
 
  }
}
