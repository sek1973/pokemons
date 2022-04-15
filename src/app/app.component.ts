import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/pokemon').subscribe(val => console.log(val));
  }
}
