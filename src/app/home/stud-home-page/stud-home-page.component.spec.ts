import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudHomePageComponent } from './stud-home-page.component';

describe('StudHomePageComponent', () => {
  let component: StudHomePageComponent;
  let fixture: ComponentFixture<StudHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
