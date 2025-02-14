import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDragDropComponent } from './stock-drag-drop.component';

describe('StockDragDropComponent', () => {
  let component: StockDragDropComponent;
  let fixture: ComponentFixture<StockDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
