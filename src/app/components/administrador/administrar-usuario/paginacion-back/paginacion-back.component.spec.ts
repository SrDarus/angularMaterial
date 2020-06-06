import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionBackComponent } from './paginacion-back.component';

describe('PaginacionBackComponent', () => {
  let component: PaginacionBackComponent;
  let fixture: ComponentFixture<PaginacionBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginacionBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginacionBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
