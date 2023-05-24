import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  formValue!: FormGroup
  restaurentModelObj: RestaurentData = new RestaurentData;
  allRestaurentData: any
  showAdd!: boolean;
  showbtn!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.getAllData();
  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']

    })
    this.getAllData()
  }
  clickaddRestro() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
  //Now Suscribing our data which is maped via Services
  addrestro() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent records Added Successful ")

      let ref = document.getElementById('clear');
      location.reload();
      this.formValue.reset()
    },
      err =>
        alert("Something went Wrong")
    )
    this.getAllData();

  }
  // Get all data
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }
  deleteRestro(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(res => {
      alert("Restaurent Records Deleted")
      this.getAllData();  //Quick refresh
    })
  }

  onEditRestro(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    console.log(data);
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateRestro() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("Restaurent Records Updated")
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
    })
    this.getAllData();
  }


}

function res(res: any) {
  throw new Error('Function not implemented.');
}

