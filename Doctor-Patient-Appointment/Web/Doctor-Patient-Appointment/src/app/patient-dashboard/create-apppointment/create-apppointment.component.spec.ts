import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApppointmentComponent } from './create-apppointment.component';

describe('CreateApppointmentComponent', () => {
  let component: CreateApppointmentComponent;
  let fixture: ComponentFixture<CreateApppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApppointmentComponent]
    });
    fixture = TestBed.createComponent(CreateApppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
