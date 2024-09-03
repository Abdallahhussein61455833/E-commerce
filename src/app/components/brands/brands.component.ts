import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {



  private readonly _CategoriesService = inject(BrandsService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  brandsList:Ibrands[]=[]

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CategoriesService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        
        this.brandsList=res.data
    this._NgxSpinnerService.hide()

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
