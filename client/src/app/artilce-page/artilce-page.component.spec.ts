import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtilcePageComponent } from './artilce-page.component';

describe('ArtilcePageComponent', () => {
  let component: ArtilcePageComponent;
  let fixture: ComponentFixture<ArtilcePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtilcePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtilcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
