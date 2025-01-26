import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorFilesComponent } from './behavior-files.component';

describe('BehaviorFilesComponent', () => {
  let component: BehaviorFilesComponent;
  let fixture: ComponentFixture<BehaviorFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BehaviorFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
