import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from '../service/myservice.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  addcustomer: any;
  CustomerId: any;
  responseData: any;

  constructor(private myservice:MyserviceService, private router:Router, private aR:ActivatedRoute) { }

  ngOnInit(): void {this.addcustomer= new FormGroup(
    {
      FirstName:new FormControl(),
     LastName:new FormControl(),
      Country:new FormControl(),
      CreateDate:new FormControl()
    }
  );

  this.CustomerId=this.aR.snapshot.paramMap.get("CustomerId");
  this.myservice.Viewcustomer(this.CustomerId).subscribe((r:any)=>{
    this.responseData = r;
    this.addcustomer.controls['FirstName'].setValue(this.responseData?.firstName);
      this.addcustomer.controls['LastName'].setValue(this.responseData?.lastName);
      this.addcustomer.controls['Country'].setValue(this.responseData?.country);
  
  });
  }
  get FirstName()
  {
    return this.addcustomer.get('FirstName');
  }
  get LastName()
  {
    return this.addcustomer.get('LastName');
  }
  
  get Country()
  {
    return this.addcustomer.get('Country');
  }
  get CreateDate()
  {
    return this.addcustomer.get('CreateDate');
  }
  backtoview(){
    this.router.navigate(['homepage']);
  }
  

}
interface resultData{
  firstName:string;
  lastName:string;
  country:string;

  CustomerId: number;
}
