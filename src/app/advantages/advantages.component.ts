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
  contratoTexto: string = "Contrato de terceirização de motoboy, aonde o cliente não tem custos adicionais como, combustível, treinamentos, férias entre outros.";
  tempoEntregaTexto: string = "Roteirização eficiente para que o seu produto chegue rápido e seguro nas mãos do cliente.";
  suporteTexto: string = "Um escritório disponível para prestar todo o suporte as operações de entrega.";
  treinamentoTexto: string = "Profissionais sempre treinados e orientados a prestar um bom atendimento ao cliente.";
  uniformesTexto: string = "Entregadores sempre uniformizados para melhor apresentação e identificação ao seu cliente.";
  equipamentoTexto: string = "Motos com os equipamentos necessários de segurança e adaptados para e operação de entregas.";
  relatorioTexto: string = "Relátório de entregas para acompanhamento da evolução das entregas do estabelecimento.";
}
