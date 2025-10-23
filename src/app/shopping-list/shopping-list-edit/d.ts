export class RecurrencePatternGeneratorComponent{
  Object = Object;

  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  pattern: string = 'daily';
  time: string = '12:00';
  date: string = '1';
  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };
  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

  onPatternChange(value: string) {
    this.pattern = value;
    this.generateDescription();
  }

  onTimeChange(value: string) {
    this.time = value;
    this.generateDescription();
    return value;
  }

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  onDateChange(value: string) {
    this.date = value;
    this.generateDescription();
  }

  generateDescription() {
    const time = this.time;
    if (this.pattern === 'daily') {
      this.description = `Runs every day at ${time}.`;
    } else if (this.pattern === 'weekly') {
      const selected = this.getDaysKeys();
      if (selected.length > 0) {
        const daysString = selected.map(this.capitalize).join(', ');
        this.description = `Runs every week on ${daysString} at ${time}.`;
      } else {
        this.description = `Runs every week at ${time}.`;
      }
    } else if (this.pattern === 'monthly') {
      const dayWithSuffix = this.ordinalSuffix(this.date);
      this.description = `Runs every month on the ${dayWithSuffix} at ${time}.`;
    }
  }

  capitalize(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  ordinalSuffix(day: string | number): string {
    const num = Number(day);
    if ([11, 12, 13].includes(num % 100)) return `${num}th`;
    const lastDigit = num % 10;
    if (lastDigit === 1) return `${num}st`;
    if (lastDigit === 2) return `${num}nd`;
    if (lastDigit === 3) return `${num}rd`;
    return `${num}th`;
  }

  getDaysKeys(): string[] {
    return Object.keys(this.selectedDays).filter(day => this.selectedDays[day]);
  }
}
