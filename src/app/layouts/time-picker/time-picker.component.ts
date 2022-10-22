import { Component, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimePickerComponent,
      multi: true
    }
  ]
})
export class TimePickerComponent implements ControlValueAccessor {
  @Output() close = new EventEmitter();

  auto = true;
  hhmm = 'hh';
  ampm = 'am';
  dial: any = [];
  hour = '12';
  minute = '00';

  private date = new Date();
  private onChange = (v: Date) => {};
  private onTouched = () => {};

  constructor() {
    const j = 84;
    for (let min = 1; min <= 12; min++) {
      const hh = String(min);
      const mm = String('00' + ((min * 5) % 60)).slice(-2);
      const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
      this.dial.push({ top: j * y + 'px', left: j * x + 'px', hh, mm });
    }
  }

  public writeValue(v: Date) {
    this.date = v || new Date();
    const hh = this.date.getHours();
    const mm = this.date.getMinutes();
    this.ampm = hh < 12 ? 'am' : 'pm';
    this.hour = String(hh % 12 || 12);
    this.minute = String('00' + (mm - (mm % 5))).slice(-2);
  }

  public registerOnChange = (fn: any) => (this.onChange = fn);

  public registerOnTouched = (fn: any) => (this.onTouched = fn);

  timeChange($event: string) {
    if (this.hhmm === 'hh') {
      this.hour = $event;
      if (this.auto) {
        this.hhmm = 'mm';
      }
    } else {
      this.minute = $event;
    }
  }

  rotateHand() {
    const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
    return `rotate(${deg * 6}deg)`;
  }

  cancel = () => this.close.emit();

  ok() {
    let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    if ((this.ampm === 'am' && hh === 12) || hh === 24) {
      hh -= 12;
    }
    this.date.setHours(hh);
    this.date.setMinutes(+this.minute);
    this.onChange(this.date);
    this.close.emit();
  }
}
