import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPieComponent } from './user-pie.component';

describe('UserPieComponent', () => {
  let component: UserPieComponent;
  let fixture: ComponentFixture<UserPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
