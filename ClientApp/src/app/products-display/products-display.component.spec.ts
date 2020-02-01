import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDisplayComponent } from './products-display.component';

describe('ProductsDisplayComponent', () => {
  let component: ProductsDisplayComponent;
  let fixture: ComponentFixture<ProductsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
