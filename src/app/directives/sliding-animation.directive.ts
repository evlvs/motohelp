import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlidingAnimation]'
})
export class SlidingAnimationDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const list = this.el.nativeElement;
    const items = list.innerHTML; // Copia o conteúdo original

    // Duplica o conteúdo para criar a ilusão de continuidade
    this.renderer.setProperty(list, 'innerHTML', items + items);

    // Calcula a duração da animação com base no comprimento da lista
    const totalWidth = list.scrollWidth / 2; // Como duplicamos, dividimos por 2
    const duration = totalWidth / 50; // Ajuste a velocidade conforme necessário

    // Aplica a animação via CSS
    this.renderer.setStyle(list, 'animation', `slide ${duration}s linear infinite`);
  }

}
