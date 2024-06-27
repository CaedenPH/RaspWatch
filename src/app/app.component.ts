import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    SidebarComponent,
    CardComponent
  ],
})
export class AppComponent {
  title = 'raspberry-dashboard';
  current_route = "/"
  constructor(private router: Router) {
    router.events.subscribe((e)=>{
      if (e instanceof NavigationEnd) {
        this.current_route = e.urlAfterRedirects.replace("/", "");
      }
    })
  }
}
