import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGenaiComponent } from './video-genai.component';

describe('VideoGenaiComponent', () => {
  let component: VideoGenaiComponent;
  let fixture: ComponentFixture<VideoGenaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGenaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoGenaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
