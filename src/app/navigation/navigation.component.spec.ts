import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { Component }                 from '@angular/core';
import { NavigationComponent }       from './navigation.component';
import { RouterLinkStubDirective, RouterOutletStubComponent }   from '../router-stubs';
import { AppModule }    from '../app.module';
import { AppRoutingModule } from '../app.routing';

let comp:    NavigationComponent;
let fixture: ComponentFixture<NavigationComponent>;

describe('NavigationComponent & TestModule', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
        declarations: [
            NavigationComponent,
            RouterLinkStubDirective
        ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(NavigationComponent);
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

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });
  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(5, 'should have 5 links');
    expect(links[0].linkParams).toBe('/home', '1st link should go to Home');
    expect(links[3].linkParams).toBe('/login', 'fourth link should go to login');
  });
  it('can click login link in template', () => {
    const loginLinkDe = linkDes[3];
    const loginLink = links[3];
    expect(loginLink.navigatedTo).toBeNull('link should not have navigated yet');
    loginLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(loginLink.navigatedTo).toBe('/login');
  });
}

