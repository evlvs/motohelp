import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { faKitMedical } from '@fortawesome/free-solid-svg-icons';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  secondCircle = false;
  pointsLngLatOrigin: string = "";
  pointsLngLat: string = "";
  pointsLngLatDestiny: string = "";
  route!: any;
  sendLoading = false;
  notSendedMessage = true;
  get points(): FormArray {
    return this.service.rotaFormGroup.get('points') as FormArray;
  }
  
  constructor(private _formBuilder: FormBuilder, public service: BudgetService) {
    // this.service.rotaFormGroup.controls['origem'].setErrors({'incorrect': true});

  }

  addPoint() {
    this.service.isValid = false;
    this.points.push(this._formBuilder.group({point: [null, Validators.required]}))
  }

  removePoint(index: number) {
    if (this.points.length >= 1) this.points.removeAt(index);
    else this.points.patchValue([{point: null}]);
  }

  onOrigin(event: any) {

    console.log(event)
    this.service.rotaFormGroup.patchValue({origem: event.address})
    this.pointsLngLatOrigin = "";
    this.pointsLngLatOrigin = `${event.lng},${event.lat};`
  }

  onPoint(event: any, index: number) {
    if(this.points.value) {      
      this.service.rotaFormGroup.controls['points'].at(index).patchValue({point: event.address})
    }

    this.pointsLngLat = this.pointsLngLat+`${event.lng},${event.lat};`
  }

  onDestiny(event: any) {

    console.log(event)
    this.service.rotaFormGroup.patchValue({destino: event.address})
    this.pointsLngLatDestiny = "";

    this.pointsLngLatDestiny = `${event.lng},${event.lat};`
  }

  async confirmRoute(form: FormGroup) {
    const rota = this.pointsLngLatOrigin+this.pointsLngLatDestiny+this.pointsLngLat;
    const rotaFinal = rota.substring(0, rota.length - 1);

    (await this.service.getRoute(rotaFinal)).subscribe((obj: any) => {
      this.route = obj
      console.log(obj.routes)
    })
  }

  isObject(val: any) {
    return val.point
  }

  onPopulaCustoForm(evento: any) {
    console.log(evento)
    this.service.custoFormGroup.patchValue(evento)
  }

  async sendMessage() {
    this.sendLoading = true;
    let message = ``
    message = `Olá me chamo ${this.service.cotacaoFormGroup.controls['nome'].value}, fiz uma cotação em seu site do endereço ${this.service.rotaFormGroup.controls['origem'].value} `
    // console.log(message)
    if(this.service.rotaFormGroup.controls['points'].value.length > 0) {
      let pontos = ` , passando pelos pontos`
      this.service.rotaFormGroup.controls['points'].value.map((obj: any, index) => {
        
        pontos = pontos + ` ${obj.point},`
        
      })
      message = `Olá me chamo ${this.service.cotacaoFormGroup.controls['nome'].value}, fiz uma cotação em seu site do endereço ${this.service.rotaFormGroup.controls['origem'].value} ` + pontos

    }

    message = message + ` e chegando em ${this.service.rotaFormGroup.controls['destino'].value}`

    message = message + ` segundo a cotação a viagem tem ${this.service.custoFormGroup.controls['distance'].value} Km, dura ${this.service.custoFormGroup.controls['time'].value} minutos e custa R$${this.service.custoFormGroup.controls['price'].value}`
  
    message = message + ` ${this.service.cotacaoFormGroup.controls['message'].value}`
    console.log(message)

    let url = `https://wa.me/5521967734378?text=${message}`
    window.open(url, '_blank')?.focus()
    this.notSendedMessage = false;
  }

}
