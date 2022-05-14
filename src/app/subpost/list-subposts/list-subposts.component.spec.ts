import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubpostsComponent } from './list-subposts.component';
import {HttpClientModule} from "@angular/common/http";

describe('ListSubpostsComponent', () => {
  let component: ListSubpostsComponent;
  let fixture: ComponentFixture<ListSubpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,],
      declarations: [ ListSubpostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
