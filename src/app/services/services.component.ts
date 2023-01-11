import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  timeLineActivated: string = 'agilidade';
  itemActive: number = 0;
  agilidade: string = "Otimização do tempo de entrega.";
  seguranca: string = "Motos com equipamento adequado para a operação de entrega.";
  qualidade: string = "Motoboys, treinados, uniformizados e regularizados.";
  transparencia: string = "Mussum Ipsum, cacilds vidis litro abertis.";

  restaurantes: string = "Nossos profissionais garantem que a comida chegue na temperatura ideal ao seu cliente.";
  distribuidoras: string = "Entregamos a bebida na casa do seu cliente em poucos minutos.";
  ecommerce: string = "Motoboys disponíveis para entregas rápidas ou agendadas.";
  autopecas: string = "Frota exclusiva para entrega de peças e materiais automotivos.";
  farmacias: string = "Entrega rápida e eficiente de produtos farmacêuticos.";
  documentos: string = "Entrega segura de diversos tipos de documentos.";
  next() {
    this.itemActive -= 330;
    console.log(this.itemActive)

    if(this.itemActive !== -1650) {
  
      document.querySelector('.services-list')?.setAttribute('style', 
      `transition:all ease-in-out .2s;-moz-transform: translateX(${this.itemActive}px);-webkit-transform: translateX(${this.itemActive}px);-o-transform: translateX(${this.itemActive}px);-ms-transform: translateX(${this.itemActive}px);transform: translateX(${this.itemActive}px);`)
      console.log(document.querySelector('.services-list'))
    } else {
      this.itemActive += 330;
    }
  }

  prev() {
    this.itemActive += 330;

    if(this.itemActive !== 330) {
  
      document.querySelector('.services-list')?.setAttribute('style', 
      `transition:all ease-in-out .2s;-moz-transform: translateX(${this.itemActive}px);-webkit-transform: translateX(${this.itemActive}px);-o-transform: translateX(${this.itemActive}px);-ms-transform: translateX(${this.itemActive}px);transform: translateX(${this.itemActive}px);`)
      console.log(document.querySelector('.services-list'))
    } else {
      this.itemActive -= 330;
    }
  }
}
