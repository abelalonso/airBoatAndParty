/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListBoatsComponent } from './listBoats.component';

describe('BoatsComponent', () => {
  let component: ListBoatsComponent;
  let fixture: ComponentFixture<ListBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
