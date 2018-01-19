function WaitForText(d, t, x) {
  this.driver = d;
  this.timeout = t;
  this.text = x;

  /**********************************************************************************
   *   Check the source of the page for some text. Since this uses                  *
   *   WebDriver.getPageSource it returns all content pre-rendered, including html  *
   *   and its attributes. Another approach would be to store the body of the page  *
   *   by tag name, then use WebElement.getText. WebElement.getText will only       *
   *   return content that's displayed on the page after html is rendered.          *
   **********************************************************************************/
  this.present = function() {
    var driver = this.driver;
    var text = this.text;
    var nt = waitFor(function() {
      return driver.getPageSource().contains(text);
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for text to be present: ' + text);
    }
  };

  this.notPresent = function() {
    var driver = this.driver;
    var text = this.text;
    var nt = waitFor(function() {
      return !driver.getPageSource().contains(text);
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for text to not be present: ' + text);
    }
  };

}