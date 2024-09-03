import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly _Router =inject(Router)

  ngOnInit(): void {

    setTimeout(() => {
      
      
      this._Router.navigate(['/home'])
      
    }, 3000);
    
  }



}
