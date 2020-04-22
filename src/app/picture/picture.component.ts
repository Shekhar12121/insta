import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  activeKardo:boolean;
  name = 'Angular 6';
  Arr = Array; //Array type captured in a variable
  num:number = 20;
  product:any;

 // urlss:any[]=[{id:1,source:'assets/abhi1.png'}]


  constructor(private http: HttpClient) {
    this.product = [
      {id:1,source:'assets/abhi1.png'},
      {id:2,source:'assets/abhi2.png'},
      {id:3,source:'assets/abhi3.png'},
      {id:4,source:'assets/abhi4.png'},
      {id:5,source:'assets/abhi5.png'},
      {id:6,source:'assets/abhi6.png'},
      {id:7,source:'assets/abhi7.png'},
      {id:8,source:'assets/abhi8.png'},
      {id:9,source:'assets/abhi9.png'}
     ];
   }

  ngOnInit(): void {
  }

  addClassInFig(){
         this.activeKardo = true;
         setTimeout(()=>{
          this.activeKardo = false;
         },2000)
  }

  //product = [];
  detectFiles(event) {
    this.product = [];

    let files: Array<File> = event.target.files;
    this.product = files;
    const formData: any = new FormData();

    if (files) {
      for (let file of files) {
        // let reader = new FileReader();
        formData.append("uploads[]", file, file['name']);
        // reader.onload = (e: any) => {
        //   this.product.push(e.target.result);
        // }
        //reader.readAsDataURL(file);
      }
      console.log('formData', formData)

      if(formData){
        this.http.post("/dataSend", formData).subscribe(
          res => {
            console.log("imgRes", res);
          },
          err => {
            console.log("imgerr", err)
          }
        );
      }

    }



    console.log('urlss', this.product)
  }



}
