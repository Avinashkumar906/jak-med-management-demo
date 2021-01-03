import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor() { }

  drugList:Array<any> = [
    {BatchCode:"Batchn_1",ExpiryDate:"2021-01-14",Price:7,DrugCode:"drug_1",Strip:10,Fcomp:"med3Fcom"},
    {BatchCode:"Batchn_2",ExpiryDate:"2021-12-14",Price:57,DrugCode:"drug_2",Strip:5,Fcomp:"med2Fcom"},
    {BatchCode:"Batchn_3",ExpiryDate:"2021-01-14",Price:567,DrugCode:"drug_70",Strip:14,Fcomp:"med1Fcom"},
    {BatchCode:"Batchn_4",ExpiryDate:"2021-01-14",Price:56,DrugCode:"drug_11",Strip:10,Fcomp:"med4Fcom"},
    {BatchCode:"Batchn_5",ExpiryDate:"2021-01-16",Price:50,DrugCode:"drug_5",Strip:2,Fcomp:"med7Fcom"},
    {BatchCode:"Batchn_6",ExpiryDate:"2010-01-12",Price:597,DrugCode:"drug_56",Strip:14,Fcomp:"med6Fcom"},
  ];
  changedDrugList:Subject<Array<any>> = new Subject<Array<any>>()

  getDrugList(){
    return this.drugList;
  }

  putDrugToList(drug){
    this.drugList.push(drug);
    this.changedDrugList.next(this.drugList);
  }

  findDrugByBatchNo(BatchCode){
    return this.drugList.find((item)=>item.BatchCode === BatchCode)
  }

  updateDrugIntoList(drug){
    let index = this.drugList.findIndex((item)=>item.DrugCode === drug.DrugCode)
    if(index >= 0){
      this.drugList[index] = drug;
      this.changedDrugList.next(this.drugList);
    }
  }

  findAndDeleteFromList(drug){
    let index = this.drugList.findIndex((item)=>item.DrugCode === drug.DrugCode)
    if(index >= 0){
      this.drugList.splice(index,1)
      this.changedDrugList.next(this.drugList);
    }
  }
}
