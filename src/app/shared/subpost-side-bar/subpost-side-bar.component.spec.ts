import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpostSideBarComponent } from './subpost-side-bar.component';
import {HttpClientModule} from "@angular/common/http";

describe('SubpostSideBarComponent', () => {
  let component: SubpostSideBarComponent;
  let fixture: ComponentFixture<SubpostSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
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
