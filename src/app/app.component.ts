import { Component } from '@angular/core';
import { ContactInformationService } from './_Services/ContactInformation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-contact-management';

  constructor()
  {
  }
}
