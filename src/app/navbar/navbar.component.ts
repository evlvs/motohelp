import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  mobileMenu = false;

  scrollToElement(element: string): void {
    // $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    console.log(document.getElementById(element)?.scrollIntoView({behavior: "smooth"}))
    document.getElementById(element)?.scrollIntoView({behavior: "smooth"});
  }
}
