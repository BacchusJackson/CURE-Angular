import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log('Submitted User');
  }
}
