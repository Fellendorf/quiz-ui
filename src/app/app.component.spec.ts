import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  const {
    mobileUserAgents,
    desktopUserAgents,
    landscapeOrientationTypes,
    portraitOrientationTypes,
    expectFromIsMobileLandscapeOrientationMethod,
  } = helpers();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  describe('If "isMobileLandscapeOrientation$" observable returns true', () => {
    beforeEach(() => {
      component.isMobileLandscapeOrientation$ = of(true);
      fixture.detectChanges();
    });

    it('The "Landscape orientation is not supported" message should be displayed', () => {
      expect(
        compiled.querySelector('.is-not-suppoted-message')?.textContent,
      ).toContain('Landscape orientation is not supported');
    });

    it('Main application will not be displayed', () => {
      const mainDivElement = compiled.querySelector('.main') as HTMLDivElement;

      expect(mainDivElement.style.display).toBe('none');
    });
  });

  describe('If "isMobileLandscapeOrientation$" observable returns false', () => {
    beforeEach(() => {
      component.isMobileLandscapeOrientation$ = of(false);
      fixture.detectChanges();
    });

    it('The "Landscape orientation is not supported" message should not be displayed', () => {
      expect(
        compiled.querySelector('.is-not-suppoted-message')?.textContent,
      ).toBeUndefined();
    });

    it('Main application will not be displayed', () => {
      const mainDivElement = compiled.querySelector('.main') as HTMLDivElement;

      expect(mainDivElement.style.display).toBeDefined();
      expect(mainDivElement.style.display).not.toBe('none');
    });
  });

  describe('private "isMobileLandscapeOrientation" method should', () => {
    it('Return true if it is a mobile device and orientation is landscape', () => {
      mobileUserAgents.forEach((userAgent) => {
        landscapeOrientationTypes.forEach((orientation) => {
          expectFromIsMobileLandscapeOrientationMethod(
            component,
            userAgent,
            orientation,
            true,
          );
        });
      });
    });

    it('Return false if it is a not mobile device or orientation is not landscape', () => {
      mobileUserAgents.forEach((userAgent) => {
        portraitOrientationTypes.forEach((orientation) => {
          expectFromIsMobileLandscapeOrientationMethod(
            component,
            userAgent,
            orientation,
            false,
          );
        });
      });

      desktopUserAgents.forEach((userAgent) => {
        landscapeOrientationTypes.forEach((orientation) => {
          expectFromIsMobileLandscapeOrientationMethod(
            component,
            userAgent,
            orientation,
            false,
          );
        });
        portraitOrientationTypes.forEach((orientation) => {
          expectFromIsMobileLandscapeOrientationMethod(
            component,
            userAgent,
            orientation,
            false,
          );
        });
      });
    });
  });
});

function helpers() {
  return {
    mobileUserAgents: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPad; CPU OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPod; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/132.0 Mobile/15E148 Safari/605.1.15',
      'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/132.0 Mobile/15E148 Safari/605.1.15',
      'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/132.0 Mobile/15E148 Safari/605.1.15',
      'Mozilla/5.0 (Android 15; Mobile; rv:132.0) Gecko/132.0 Firefox/132.0',
      'Mozilla/5.0 (Android 15; Mobile; LG-M255; rv:132.0) Gecko/132.0 Firefox/132.0',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPad; CPU OS 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPod touch; CPU iPhone 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 EdgA/130.0.2849.80',
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 EdgA/130.0.2849.80',
      'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 EdgA/130.0.2849.80',
      'Mozilla/5.0 (Linux; Android 10; ONEPLUS A6003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 EdgA/130.0.2849.80',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 EdgiOS/130.2849.80 Mobile/15E148 Safari/605.1.15',
      'Mozilla/5.0 (Windows Mobile 10; Android 10.0; Microsoft; Lumia 950XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Edge/40.15254.603',
      'Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 OPR/76.2.4027.7337',
      'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 OPR/76.2.4027.73374',
      'Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 Mobile Safari/537.36 OPR/76.2.4027.73374',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 YaBrowser/24.10.5.295 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPad; CPU OS 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 YaBrowser/24.10.5.295 Mobile/15E148 Safari/605.1',
      'Mozilla/5.0 (iPod touch; CPU iPhone 17_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 YaBrowser/24.10.5.295 Mobile/15E148 Safari/605.1',
      'Mozilla/5.0 (Linux; arm_64; Android 15; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.39 YaBrowser/24.10.4.98 Mobile Safari/537.36',
    ],
    desktopUserAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.7; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (X11; Linux i686; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)',
      'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
      'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
      'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 6.2; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/130.0.2849.80',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/130.0.2849.80',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/114.0.0.0',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/114.0.0.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/114.0.0.0',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/114.0.0.0',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Vivaldi/7.0.3495.14',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Vivaldi/7.0.3495.14',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Vivaldi/7.0.3495.14',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Vivaldi/7.0.3495.14',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Vivaldi/7.0.3495.14',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 YaBrowser/24.10.1.669 Yowser/2.5 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 YaBrowser/24.10.1.669 Yowser/2.5 Safari/537.36]',
    ],
    landscapeOrientationTypes: [
      'landscape-primary',
      'landscape-secondary',
    ] as OrientationType[],
    portraitOrientationTypes: [
      'portrait-primary',
      'portrait-secondary',
    ] as OrientationType[],
    expectFromIsMobileLandscapeOrientationMethod: (
      component: AppComponent,
      userAgent: string,
      orientationType: string,
      isShouldBeTrue: boolean,
    ) => {
      expect(
        component['isMobileLandscapeOrientation'](userAgent, orientationType),
      )
        .withContext(
          `Orientation: ${orientationType}; User Agent: ${userAgent}`,
        )
        [isShouldBeTrue ? 'toBeTrue' : 'toBeFalse']();
    },
  };
}
