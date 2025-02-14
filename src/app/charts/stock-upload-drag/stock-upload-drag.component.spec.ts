import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUploadDragComponent } from './stock-upload-drag.component';

describe('StockUploadDragComponent', () => {
  let component: StockUploadDragComponent;
  let fixture: ComponentFixture<StockUploadDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockUploadDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUploadDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
