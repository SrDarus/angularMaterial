import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionFrontComponent } from './paginacion-front.component';

describe('PaginacionFrontComponent', () => {
  let component: PaginacionFrontComponent;
  let fixture: ComponentFixture<PaginacionFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginacionFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginacionFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
