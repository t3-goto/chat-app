import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatDate',
})
export class ChatDatePipe implements PipeTransform {
  transform(date: number): string {
    return this.getStringFromDate(new Date(date));
  }

  private getStringFromDate(date: Date): string {
    const yearStr: string = String(date.getFullYear());
    const monthStr: string = String(1 + date.getMonth());
    const dayStr: string = String(date.getDate());
    const hourStr: string = String(date.getHours());
    const minuteStr: string = String(date.getMinutes());
    const dayOfWeekStr: string = [
      '日',
      '月',
      '火',
      '水',
      '木',
      '金',
      '土',
      '日',
    ][date.getDay()];

    const formatStr = 'YYYY年MM月DD日 hh:mm d曜日';
    return formatStr
      .replace(/YYYY/g, yearStr)
      .replace(/MM/g, monthStr)
      .replace(/DD/g, dayStr)
      .replace(/hh/g, hourStr)
      .replace(/mm/g, minuteStr)
      .replace(/d/g, dayOfWeekStr);
  }
}
