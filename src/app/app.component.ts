import { AfterViewInit, Component, Input } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(  public restApi: RestApiService,
    private snack : MatSnackBar,
   ) { }


  ngAfterViewInit(): void {
    this.getAll()
  }

  Email = new FormControl('', [Validators.required, Validators.email]);
  Mobileno = new FormControl('', Validators.required);
 displayedColumns: string[] = ['name','email', 'mobileno', 'address', 'gender', 'edit'];
dataSource : any;
title = 'AMD - ';
submit = " ";
name = '';
id = 0;
email = "";
address = "";
mobileNumber = "";
gender = " ";
List: any = [];
items = [
  { gender: 'Male', value:"Male"},
  { gender: 'Female',value:"Female"}
  
];
isButtonDisabled: boolean = true;


  addDetails(){

    if(this.submit === "Edit"){
      let data = {
        id : this.id,
        name : this.name,
        address : this.address,
        mobileNumber : this.mobileNumber,
        email : this.email,
        gender : this.gender
      }
      this.restApi.updateDetails(data).subscribe(data => {      
        var status = data.status;
       console.log(status);
       this.getAll();
       this.submit = " ";
       this.id = 0;
       this.name = "";
       this.address ="";
       this.mobileNumber = "";
       this.gender = "";
       this.email = "";
       alert("Updated sucessfully");
       window.location.reload();
    });
    }
else{
    let data = {
      name : this.name,
      address : this.address,
      mobileNumber : this.mobileNumber,
      email : this.email,
      gender : this.gender
    }
    this.restApi.addDetails(data).subscribe(data => {      
      var status = data.status;
     console.log(status);
     this.submit = " ";
     this.id = 0;
     this.name = "";
     this.address ="";
     this.mobileNumber = "";
     this.gender = "";
     this.email = "";
     alert("Submitted sucessfully");
     window.location.reload();
  });}

}

getAll(){
  this.restApi.getAllDetails().subscribe(data => {      
    this.List = data;
    this.dataSource = new MatTableDataSource(this.List);
   console.log(data);
});
}

edit(data : any){

  let id = data.id;
  this.restApi.findByvalue(id).subscribe(data => {      
    this.List = data;
    this.dataSource = new MatTableDataSource(this.List);
   console.log(data);
   this.getAll();
   this.id = data.id;
   this.name = data.name;
   this.address = data.address;
   this.mobileNumber = data.mobileNumber;
   this.gender = data.gender;
   this.email = data.email;
   this.submit = "Edit";
   this.scrollToTop();
});

}


update(){
  if(this.submit === "Edit"){
  let data = {
    id : this.id,
    name : this.name,
    address : this.address,
    mobileNumber : this.mobileNumber,
    email : this.email,
    gender : this.gender
  }
  this.restApi.updateDetails(data).subscribe(data => {      
    var status = data.status;
   console.log(status);
   this.getAll();
   this.submit = " ";
   this.id = 0;
   this.name = "";
   this.address ="";
   this.mobileNumber = "";
   this.gender = "";
   this.email = "";
});
}
}

 scrollToTop() {
  window.scrollTo(0, 0); 
}


}
