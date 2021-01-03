import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrugService } from './services/drug.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  form:FormGroup;
  filterKey:string;
  filterValue:string;
  isUpdate:boolean;
  sortingKey:string;
  sortingOrder: number;
  availableDrugList:Array<any> = this.drugService.getDrugList();

  constructor(
    private formBuilder:FormBuilder,
    private drugService:DrugService
    ){
  }

  ngOnInit(){
    this.isUpdate = false;
    this.sortingOrder = 1;

    this.drugService.changedDrugList.subscribe(
      (data)=>this.availableDrugList = data
    )
    this.form = this.formBuilder.group({
      BatchCode:['',[Validators.minLength(8),Validators.required]],
      ExpiryDate:['',Validators.required],
      Price:['',Validators.required],
      DrugCode:['',Validators.required],
      Strip:['',Validators.required],
      Fcomp:['',Validators.required],
    })
  }

  checkAvailableBatch(){
    let drug = this.drugService.findDrugByBatchNo(this.form.value.BatchCode)
    if(drug){
      this.form.patchValue(drug);
      this.isUpdate = true;
    }
  }

  addDrug(){
    this.drugService.putDrugToList(this.form.value)
    alert("Drug added to inventory!");
    this.reset()
  }

  updateDrug(){
    this.drugService.updateDrugIntoList(this.form.value)
    alert("Drug updated in inventory!");
    this.reset()
  }

  submit(){
    if(!this.isUpdate){
      this.addDrug()
    } else {
      this.updateDrug()
    }
  }

  setFilter(value){
    this.filterKey = value;
  }

  setSorting(value){
    if(this.sortingKey !== value){
      this.sortingKey = value;
    } else {
      this.sortingOrder = this.sortingOrder * -1;
    }
  }

  deleteDrug(drug){
    this.drugService.findAndDeleteFromList(drug)
  }

  updateDrugInfo(drug){
    this.form.patchValue(drug);
    this.isUpdate = true;
  }

  reset(){
    this.isUpdate = false;
    this.form.reset();
  }
}
