import { Component } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {

  partners = [
    {partnerName: "BAR DO ELIAS (Flamengo/Botafogo)", logo: ""},
    {partnerName: "TACACÁ DO NORTE", logo: ""},
    {partnerName: "BASTARDA", logo: ""},
    {partnerName: "TEMAKERIA E CIA(Jardim Botânico/Barra)", logo: ""},
    {partnerName: "Rão Burger(Botafogo)", logo: ""},
    {partnerName: "The Box Sushi(Ipanema)", logo: ""},
    {partnerName: "Pizzaria Universo", logo: ""},
    {partnerName: "Forneria Vôrides", logo: ""},
    {partnerName: "Casa da Feijoada", logo: ""},
    {partnerName: "Colégio Pedro II", logo: ""}
  ]
}
