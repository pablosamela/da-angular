import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getIdFromUrl'
})
export class GetIdFromUrlPipe implements PipeTransform {

  transform(url: string): string {
    const urlSpliter = url.split('/');
    return urlSpliter[urlSpliter.length - 2];
  }

}
