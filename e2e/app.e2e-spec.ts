import { RfpNg2Page } from './app.po';

describe('rfp-ng2 App', function() {
  let page: RfpNg2Page;

  beforeEach(() => {
    page = new RfpNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
