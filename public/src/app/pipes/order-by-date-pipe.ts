import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
  // will receive an array of objects and will return it orderded by
  // property createdAt
  transform(items: any[]) {
    return _.orderBy(items, (a, b) => new Date(a['createdAt']), ['desc']);
  }
}

