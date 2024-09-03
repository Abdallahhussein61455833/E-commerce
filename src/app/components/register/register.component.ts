import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService =inject(AuthService)
  private readonly _Router =inject(Router)


  msgError:string="";
  isLoading:boolean=false
  msgSuccess:boolean=false

  registerForm: FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern( /^\w{6,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

  },this.confirmpassword);

 

  confirmpassword(g:AbstractControl)
  {
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null
    }
    else
    {
      return{mismatch:true}
    }

  }

  registersubmit():void{

    if(this.registerForm.valid)
    {
      this.isLoading=true
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message=='success'){
            
            setTimeout(() => {
              this._Router.navigate(['/login'])
              
            }, 1000);


          }
          
          this.isLoading=false

        },
        error:(err)=>{
          this.msgError=err.error.message
          console.log(err)
          this.isLoading=false
        }

      })
      


    }
  
    

  }

}
