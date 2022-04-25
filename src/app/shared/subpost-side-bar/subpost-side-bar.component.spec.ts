import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpostSideBarComponent } from './subpost-side-bar.component';

describe('SubpostSideBarComponent', () => {
  let component: SubpostSideBarComponent;
  let fixture: ComponentFixture<SubpostSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpostSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpostSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
