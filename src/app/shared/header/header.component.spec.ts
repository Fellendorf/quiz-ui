import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let componentInstance: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    componentInstance = fixture.componentInstance;
    template = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('If "goToOnClick" property value is "menu", then link to the main menu is displayed', () => {
    const expectedText = 'МЕНЮ';

    componentInstance.goToOnClick = 'menu';
    fixture.detectChanges();

    expect(template.querySelector('a')?.textContent).toBe(expectedText);
  });

  describe('If "goToOnClick" property value is "back"', () => {
    beforeEach(() => {
      componentInstance.goToOnClick = 'back';
      fixture.detectChanges();
    });

    it('Then link to go back is displayed', () => {
      expect(template.querySelector('a')?.textContent).toBe('НАЗАД');
    });

    it('And a user clicks on it, then "goBack()" method is called', () => {
      const componentGoBackSpy = spyOn(componentInstance, 'goBack');
      template.querySelector('a')?.click();

      expect(componentGoBackSpy).toHaveBeenCalled();
    });
  });

  it('If "goBack()" method is called, then "location.back()" method is called', () => {
    const locationBackSpy = spyOn(componentInstance['location'], 'back');
    componentInstance.goBack();

    expect(locationBackSpy).toHaveBeenCalled();
  });

  it('Template displays "topText" property correctly', () => {
    const expectedText = 'Some Main Text in the Header';

    componentInstance.topText = expectedText;
    fixture.detectChanges();

    expect(template.querySelector('h2')?.textContent).toBe(expectedText);
  });

  it('If "bottomText" property was passed to the component, then it will be displayed', () => {
    const expectedText = 'Some Additional Text in the Header';

    componentInstance.bottomText = expectedText;
    fixture.detectChanges();

    expect(template.querySelector('h3')?.textContent).toBe(expectedText);
  });

  it('If "bottomText" property was not passed to the component, then it will not be displayed', () => {
    expect(template.querySelector('h3')?.textContent).toBeUndefined();
  });
});
