import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from './common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud';
  userPercentage: number;
  isEdit  = false;
  allUser: Object;
  userObj = {
    firstName :'',
    lastName:'',
    address:'',
    email:'',
    contact:''
  };
  formGroup: FormGroup;
  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getLatesteUser();
  }
 

  addUser(formObj) {
    console.log(formObj)

    this.commonService.createUser(formObj).subscribe((res) => {     
      this.getLatesteUser();
 
    })
    formObj.reset();
  }
  getLatesteUser() {
    this.commonService.getAllUser().subscribe((res) => {
      this.allUser = res
      console.log(res)
    })
  }
  editUser(user) {
    this.isEdit = true;
    this.userObj = user
  }

  deleteUser(user) {
    this.commonService.deleteUser(user).subscribe(() => {
      this.getLatesteUser()
    })
  }
  updateUser(){
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(()=>{
      this.getLatesteUser();
    })
  }
}
