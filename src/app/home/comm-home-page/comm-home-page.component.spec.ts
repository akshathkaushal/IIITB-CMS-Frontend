import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommHomePageComponent } from './comm-home-page.component';

describe('CommHomePageComponent', () => {
  let component: CommHomePageComponent;
  let fixture: ComponentFixture<CommHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
