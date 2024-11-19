import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OsaStoreComponent } from "./page/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OsaStoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LpOsaStore';
}
