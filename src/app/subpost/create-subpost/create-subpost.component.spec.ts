import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubpostComponent } from './create-subpost.component';

describe('CreateSubpostComponent', () => {
  let component: CreateSubpostComponent;
  let fixture: ComponentFixture<CreateSubpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
