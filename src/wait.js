/************************************************************************************
 *   Some basic wait utilities that are useful in a lot of scenarios. It's not      *
 *   uncommon for a page to add and detach elements from its Dom, or pop things in  *
 *   and out of visibility, so it's good to have a fluent way to wait when these    *
 *   types of events occur. These share similarity to some very common methods from *
 *   the older Selenium RC library.                                                 *
 ************************************************************************************/
function Wait(d, t) {
  /**********************************************************************************
   *   Check the constructors and store them. The 'd' parameter is an instance of   *
   *   WebDriver and 't' is a timeout value in milliseconds. If 'd' is not an       *
   *   object, fail. We also use toString() to make sure it follows the typical     *
   *   pattern of a WebDriver object. If 't' isn't an integer, it will try          *
   *   to convert it to one and throw an error if NaN.                              *
   **********************************************************************************/
  if (typeof d === 'object') {
    // Use regex to make sure it appears to be a WebDriver object or error
    var r = /^WebmetricsWebDriver:\s.*\son\s.*\s\(.*\)/i;
    if (!r.test(d.toString())) {
      fail('WaitException: object is not a valid WebDriver instance');
    }
  } else {   
    // A string, number or undefined throw this error
    fail('WaitException: WebDriver object required');
  }
  if (typeof t === 'undefined') {
    // Throw if timeout is undefined
    fail('WaitException: timeout value required');
  }
  // If for some reason timeout isn't a number, try to convert it
  if (typeof t !== 'number') {
    t = Number(t);
    if (isNaN(t)) {
      // Throw if not a number
      fail('WaitException: timeout value is NaN');
    }
  }
  this.driver = d;
  this.timeout = t;
  /**********************************************************************************
   *   Wait for a page to be 'completed' loading. We consider this to be when the   *
   *   'ready state' property of the document is complete. You do this with         *
   *   Selenium using the WebDriver.executeScript method to                         *
   *   'return document.readyState'.                                                *
   **********************************************************************************/
  this.forPageToLoad = function() {
    var driver = this.driver;
    var nt = waitFor(function() {
      // Check the document ready state
      return driver.executeScript('return document.readyState;').equals('complete');
    }, this.timeout);
    // Using a try...catch for cleaner looking error messages
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for page to load');
    }
  };
  /**********************************************************************************
   *   Wait for an element to be attached to the DOM. Since WebDriver.findElement   *
   *   will always produce an error if no element is found, we use the alternate    *
   *   method WebDriver.findElements. This returns a list of all elements matching  *
   *   the locator, or 0 if none are found. Once the element is present, the        *
   *   return will be greater than zero, hence satisfying the wait condition.       *
   **********************************************************************************/
  this.forElementPresent = function(l) {
    if (typeof l === 'object') {
      // Test to see if the locator is valid, using the By mechanism
      try {
        this.driver.findElements(l);
      } catch (e) {
        fail('WaitException: object is not a valid locator: ' + l.toString());
      }
    } else {
      fail('WaitException: locator object required');
    }
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.findElements(l).size() > 0;
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element: ' + l.toString());
    }
  };
  /**********************************************************************************
   *   Wait for an element to be displayed by using the WebElement.isDisplayed      *
   *   method. Since this looks for a specific element using WebDriver.findElement, *
   *   it will error immediately if the element isn't already in the DOM. Sometimes *
   *   you may need to wait for an element to be attached, then wait for the page   *
   *   to make it visible, depending on how a site is designed.                     *
   **********************************************************************************/
  this.forVisible = function(l) {
    if (typeof l === 'object') {
      // Test to see if it's a valid element
      try {
        this.driver.findElement(l);
      } catch (e) {
        fail('WaitException: unable to locate element: ' + l.toString());
      }
    } else {
      fail('WaitException: locator object required');
    }
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.findElement(l).isDisplayed();
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element to be visible: ' + l.toString());
    }
  };
  /**********************************************************************************
   *   Check the source of the page for some text. Since this uses                  *
   *   WebDriver.getPageSource it returns all content pre-rendered, including html  *
   *   and its attributes. Another approach would be to store the body of the page  *
   *   by tag name, then use WebElement.getText. WebElement.getText will only       *
   *   return content that's displayed on the page after html is rendered.          *
   **********************************************************************************/
  this.forTextPresent = function(t) {
    if (typeof t !== 'string') {
      fail('WaitException: string of text required');
    }
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.getPageSource().contains(t);
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for text to be present: ' + t);
    }
  };
}