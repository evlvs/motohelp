import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
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

  get points(): FormArray {
    return this.service.rotaFormGroup.get('points') as FormArray;
  }
  
  constructor(private _formBuilder: FormBuilder, public service: BudgetService) {

  }

  addPoint() {
    this.points.push(this._formBuilder.group({point: null}))
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
    this.pointsLngLat = this.pointsLngLat+`${event.lng},${event.lat}`
  }

  onDestiny(event: any) {

    console.log(event)
    this.service.rotaFormGroup.patchValue({destino: event.address})
    this.pointsLngLatDestiny = "";
    this.pointsLngLatDestiny = `${event.lng},${event.lat};`
  }

  async confirmRoute(form: FormGroup) {
    const rota = this.pointsLngLatOrigin+this.pointsLngLat+this.pointsLngLatDestiny;
    (await this.service.getRoute(rota)).subscribe((obj: any) => {
      console.log(obj)
    })
  }
}
