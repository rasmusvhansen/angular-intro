import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emphasize'
})
export class EmphasizePipe implements PipeTransform {
  transform(value: string = '', query: string = 'rick'): any {
    const regex = new RegExp(`(${query})`, 'gi');
    return value.replace(regex, `***${query.toLocaleUpperCase()}***`);
  }
}
