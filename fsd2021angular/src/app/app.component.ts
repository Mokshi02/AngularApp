import { Component } from '@angular/core';
import { DBService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// controller where we write our business logic
// i.e aldo will be coded here
// it will use model to hold and process data
export class AppComponent {
  // Model -> Single Value Container call String
  // Model which are holding data for us :)
  title = 'fsd2021angular';
  show = true;
  quote = "Be Exceptional";

  changeQuote(){
    this.quote = "Work Hard";
  }
  // Model -> Multi Value Container called Object
  profile = {
    name: 'John Watson',
    email: 'John@example.com',
    age: 21
  };
}
