import { Pipe, PipeTransform } from '@angular/core';
import { Session } from 'src/app/shared/models/session.model';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(sessionsData: Session[], searchValue: string): Session[] {
    if (!sessionsData || !searchValue) {
      return sessionsData;
    }

    return sessionsData.filter(
      (row) =>
        row.doctorName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        row.startDate
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
    );
  }
}
