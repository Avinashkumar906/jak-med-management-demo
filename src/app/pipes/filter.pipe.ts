import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: Array<any>, value:string, key: string,): Array<any> {
    if(!value || !key)
      return list;

    let tempArray = []
    list.forEach((item)=>{
      if((item[key].includes(value))){
        tempArray.push(item)
      }
    })

    return tempArray
  }

}
