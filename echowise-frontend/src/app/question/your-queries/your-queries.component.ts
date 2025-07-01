import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-your-queries',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './your-queries.component.html',
  styleUrl: './your-queries.component.css'
})
export class YourQueriesComponent {

}
