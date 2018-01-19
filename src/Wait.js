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
      return driver.executeScript('return document.readyState;').equals('complete');
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for page to load');
    }
  };

  // Subclasses
  this.forElement = function(l) {
    if (typeof l !== 'object') {
      fail('WaitException: locator object is required')
    }
    return new WaitForElement(this.driver, this.timeout, l);
  };

  this.forText = function(x) {
    if (typeof x === 'number') {
      x = x.toString();
    } else if (typeof x === 'string') {
      x = x;
    } else {
      fail('WaitException: a string is required');
    }
    return new WaitForText(this.driver, this.timeout, x);
  };

  this.forAlert = function() {
    return new WaitForAlert(this.driver, this.timeout);
  };

}