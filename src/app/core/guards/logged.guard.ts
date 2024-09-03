import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)

  if(typeof localStorage!=='undefined'){
    if(localStorage.getItem('userToken')!==null)
      {
        _Router.navigate(['/home'])
        return false 
      }
      else {
       
    
        return true
      }

  }
  else{
    return false
  }




  
};
