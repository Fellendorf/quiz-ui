import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuScreenComponent } from './menu-screen.component';

describe('MenuScreenComponent', () => {
  let component: MenuScreenComponent;
  let fixture: ComponentFixture<MenuScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
