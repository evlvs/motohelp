import { Component } from '@angular/core';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent {
  maoObra = false;
  contrato = false;
  tempoEntrega = false;
  suporte = false;
  treinamento = false;
  uniformes = false;
  equipamento = false;
  relatorio = false;

  maoObraTexto: string = "Nessa modalidade nossos profissionais atuam exclusivamente para a empresa contratante com total responsabilidade da MOTO HELP.";
  contratoTexto: string = "";
  tempoEntregaTexto: string = "";
  suporteTexto: string = "";
  treinamentoTexto: string = "";
  uniformesTexto: string = "";
  equipamentoTexto: string = "";
  relatorioTexto: string = "";
}
