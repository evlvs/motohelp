import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  scrollToElement(element: string): void {
    // $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    console.log(document.getElementById(element)?.scrollIntoView({behavior: "smooth"}))
    document.getElementById(element)?.scrollIntoView({behavior: "smooth"});
  }
}
