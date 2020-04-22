import { Component, OnInit, Input, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  changeClass: boolean = true;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
 public user = {};
  displayFlag: boolean = false;
  ngOnInit(): void {
    localStorage.clear();
  }

  logForm() {
    console.log("dd", this.user);
    console.log(localStorage.getItem("dataSource"))

    if (localStorage.getItem("dataSource")) {
      this.callApi('no');
    } else {
      localStorage.setItem("dataSource", this.user["username"]);
      this.openDialog(this.user);
      this.callApi('yes');
    }
  }

  callApi(flagName) {
    console.log(flagName);
    flagName == 'yes' ? this.displayFlag = false : this.displayFlag = true;
    console.log('displayFlag', this.displayFlag);

    this.http.post("http://localhost:4800/dataSend", this.user).subscribe(
      res => {
        this.user = {};
        console.log("hh", res);
      },
      err => {
        this.user = {};
        console.log("err", err)
      }
    );
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogBox, {
      width: "250px",
      data: { name: data.username }
    });
  }
}

@Component({
  selector: "dialog-box",
  templateUrl: "dialog-box.html"
})
export class DialogBox{

  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
