import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value && (typeof value == 'string' || value instanceof Date)) {
      return moment(value).fromNow();
    }
    return "";
  }

}
