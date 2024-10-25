import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionsScreenComponent } from './admin-questions-screen.component';

describe('AdminQuestionsScreenComponent', () => {
  let component: AdminQuestionsScreenComponent;
  let fixture: ComponentFixture<AdminQuestionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionsScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuestionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
