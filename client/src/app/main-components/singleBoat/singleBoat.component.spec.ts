/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SingleBoatComponent } from './singleBoat.component';

describe('SingleBoatComponent', () => {
  let component: SingleBoatComponent;
  let fixture: ComponentFixture<SingleBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
