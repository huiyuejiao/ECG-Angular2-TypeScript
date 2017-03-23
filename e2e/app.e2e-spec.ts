import { EcgAppPage } from './app.po';

describe('ecg-app App', function() {
  let page: EcgAppPage;

  beforeEach(() => {
    page = new EcgAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
