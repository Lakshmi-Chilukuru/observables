import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterControlsComponent } from './counter-controls.component';

describe('CounterControlsComponent', () => {
  let component: CounterControlsComponent;
  let fixture: ComponentFixture<CounterControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterControlsComponent]
    });
    fixture = TestBed.createComponent(CounterControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
