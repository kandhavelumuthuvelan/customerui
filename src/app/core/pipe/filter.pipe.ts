import { Pipe, PipeTransform } from '@angular/core';
import { ChatModel } from '../model/ChatModel';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: ChatModel[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.productDetail.name.toLowerCase().includes(searchText);
    });
  }
}
