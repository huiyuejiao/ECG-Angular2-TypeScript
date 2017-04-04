import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Component, NO_ERRORS_SCHEMA }          from '@angular/core';
import { AppComponent }              from './app.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLinkStubDirective, RouterOutletStubComponent }   from './router-stubs';
import { AppModule }    from './app.module';
import { AppRoutingModule } from './app.routing';
  @Component({selector: 'app-navigation', template: ''})
  class AppNavigationStubComponent {}
    let comp:    AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    describe('AppComponent & TestModule', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            FooterComponent, AppNavigationStubComponent,
            RouterLinkStubDirective, RouterOutletStubComponent
        ]
        })
        .compileComponents()
        .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterLinkStubDirective ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })

    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});
// Testing real root module //
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
describe('AppComponent & AppModule', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRoutingModule ]
      },
      add: {
        declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});
function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    // trigger initial data binding
    fixture.detectChanges();
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

}

