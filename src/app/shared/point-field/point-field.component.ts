import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { BudgetService } from 'src/app/budget/budget.service';
import { Address } from '../interface/Address';

@Component({
  selector: 'app-point-field',
  templateUrl: './point-field.component.html',
  styleUrls: ['./point-field.component.scss']
})
export class PointFieldComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<Address[]>;
  @Input() fieldName!: string;
  timeType!: any; 
  point: Address[] = [];
  @Output() pointOut = new EventEmitter();
  loading = false;
  isValid = false;
  isInvalid = false;

  constructor(public budgetService: BudgetService) {

  }

  getPoint(event: any) {
    let address = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.isValid = false;
    this.isInvalid = false;
    this.budgetService.isValid = false;
    console.log(address, this.point[0]?.address)
    if(address !== '') {
       address !== this.point[0]?.address ? this.point = [] : null;
      clearTimeout(this.timeType)
      this.timeType = setTimeout(() => {
        this.point.length <= 0 ? this.searchLatLngPoint(address) : null
      }, 2000)
      if(event.keyCode === 8) {
        clearTimeout(this.timeType)
        this.point = [];
      }
    }
  }

  async searchLatLngPoint(address: string) {
    if(address !== '' || address !== null) {
      clearTimeout(this.timeType);
    }
    (await this.budgetService.getLatLng(address)).subscribe((obj: any) => {
      console.log(obj.error_message)
      if(obj.status === 'OK') {
        obj.results.map((address: any) => {
          this.point.push({
            address: address.formatted_address,
            lat: address.geometry.location.lat,
            lng: address.geometry.location.lng
          })
        })
        
  
        this.filteredOptions = this.budgetService.rotaFormGroup.controls['origem'].valueChanges.pipe(
          startWith(''),
          map((value: any) => this._filter(value || '')),
        );
      } else {
        this.isInvalid = true;
        this.loading = false;
      }
    })

  }

  private _filter(value: string): Address[] {
    const filterValue = value.toLowerCase();

    return this.point.filter(option => option.address.toLowerCase().includes(filterValue));
  }

  sendPoint(address: Address) {
    this.loading = false
    this.isValid = true;
    this.budgetService.isValid = true;

    this.pointOut.emit(address);
  }
}
