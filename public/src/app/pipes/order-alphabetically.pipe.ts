import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderAlphabeticallyPipe implements PipeTransform {
  // will receive an array of objects and will return it orderded by
  // property createdAt 
  transform(items: any[], isDesc = false, sortBy?: string) {
    if (sortBy) {
      if (isDesc) {
        return items.sort((x, y) => {
          return this.sortDesc(x[sortBy].toString(), y[sortBy].toString());
        });
      }
      else {
        return items.sort((x, y) => {
          return this.sortAsc(x[sortBy].toString(), y[sortBy].toString());
        });
      }
    } else {
      return items.sort();
    }
  };

  private sortDesc(x: string, y: string) {
    return y.localeCompare(x);
  }
  private sortAsc(x: string, y: string) {
    return x.localeCompare(y);
  }
}
