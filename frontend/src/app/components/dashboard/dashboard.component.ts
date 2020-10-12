import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;

  constructor(private myservice: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.myservice.getUserName().subscribe(data => {this.username = data.toString(); });
  }

  ngOnInit(): void {
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/main/login']);
  }

}
