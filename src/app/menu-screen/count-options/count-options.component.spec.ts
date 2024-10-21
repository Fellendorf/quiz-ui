import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountOptionsComponent } from './count-options.component';

describe('CountOptionsComponent', () => {
  let component: CountOptionsComponent;
  let fixture: ComponentFixture<CountOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
