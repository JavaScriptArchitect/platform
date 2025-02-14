import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPieComponent } from './form-pie.component';

describe('FormPieComponent', () => {
  let component: FormPieComponent;
  let fixture: ComponentFixture<FormPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
