import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCloudComponent } from './storage-cloud.component';

describe('StorageCloudComponent', () => {
  let component: StorageCloudComponent;
  let fixture: ComponentFixture<StorageCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageCloudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
