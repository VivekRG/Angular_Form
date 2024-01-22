import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';

  public user:any;
  constructor(private _userRegistrationService: UserRegistrationService) { }

  ngOnInit(): void {
    this._userRegistrationService.getUser()
    .subscribe(data => {
      this.user = data;
      console.log(this.user)
    })
  }

  registerForm = new FormGroup({
    firstname: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    lastname: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    gender: new FormControl("", [Validators.required]),
    pwd: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15 )
    ]),
    rpwd: new FormControl("")
  });

  registerSubmitted(){
    // console.log(this.registerForm.value);

    

    if (this.PWD.value == this.RPWD.value){
      console.log("Submitted....");
      var user = {
        "First_Name": this.FirstName.value,
        "Last_Name": this.LastName.value,
        "Email_Address": this.Email.value,
        "Mobile_Number": this.Mobile.value,
        "Gender": this.Gender.value,
        "Password": this.PWD.value,
        
      }
      console.log(user);
      this._userRegistrationService.getSingleUser(this.Email.value)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
        if (this.user == 0){
          this._userRegistrationService.postUser(user);
          alert(this.Email.value + " is successfully registered");
        }
          else{
            alert(this.Email.value + " is already registered");
          }
      })
      
      
        
      this.repeatPass = 'none';
    }
    else{
      this.repeatPass = 'inline';
    }

  }

  get FirstName() : FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName() : FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email() : FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get Mobile() : FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }

  get Gender() : FormControl{
    return this.registerForm.get("gender") as FormControl;
  }

  get PWD() : FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }

  get RPWD() : FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }
}
