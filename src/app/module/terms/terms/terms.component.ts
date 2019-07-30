import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Terms of Use');
    this.loginNow();
  }
  loginNow(): void {
    $('#register-modal').modal('hide');
  }

}
