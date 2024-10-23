import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionScreenComponent } from './edit-question-screen.component';

describe('EditQuestionScreenComponent', () => {
  let component: EditQuestionScreenComponent;
  let fixture: ComponentFixture<EditQuestionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuestionScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
