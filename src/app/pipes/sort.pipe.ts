import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, key:string, order:number): Array<any> {
    if(!key)
      return value;

    let temparray = new Array<any>();
    temparray = value.sort((a:any,b:any)=>{
      if(a[key] > b[key]){
        return 1 * order;
      } else if(a[key] < b[key]){
        return -1 * order;
      } else{
        return 0;
      }
    })

    return temparray;
  }

}
