import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetslotsComponent } from './getslots.component';

describe('GetslotsComponent', () => {
  let component: GetslotsComponent;
  let fixture: ComponentFixture<GetslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetslotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
