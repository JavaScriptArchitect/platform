import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongLambdaComponent } from './long-lambda.component';

describe('LongLambdaComponent', () => {
  let component: LongLambdaComponent;
  let fixture: ComponentFixture<LongLambdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongLambdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongLambdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
