import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
allUser:any;
  registerForm : any;
  regFormSubmitted = false;

    public gender: string;
  public formattedDate;
  constructor(    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }




  ngOnInit() {
    this.createForm();
   this.getAllUser()
  }

  private getAllUser(){
    this.userService.getAllUser().subscribe((res) => {
      this.allUser = res
      console.log(res)
    })
  }

  createForm() {
    const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],     
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(patternEmail)]],      
      birthDate: ['', Validators.required],
    
    });
  }

  get rf() { return this.registerForm }

  submitBasic() {
    this.regFormSubmitted = true;
    console.log(this.registerForm.value);
    this.userService.createUser(this.registerForm.value).subscribe(res =>{
      this.router.navigate(['./list-user']);
      this.getAllUser()
    })
   this.registerForm.reset()
  }


}
