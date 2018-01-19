function WaitForElement(d, t, l) {
  this.driver = d;
  this.timeout = t;
  this.element = l;

  /**********************************************************************************
   *   Wait for an element to be attached to or detached from the DOM. Since        *
   *   WebDriver.findElement will always produce an error if no element is found,   *
   *   we use the alternate method WebDriver.findElements. This returns a list of   *
   *   all elements matching the locator, or 0 if none are found. Once the element  *
   *   is or isn't present, the return will be greater than zero or less than 1,    *
   *   hence satisfying the wait conditions.                                        *
   **********************************************************************************/
  this.present = function() {
    var driver = this.driver;
    try {
      this.driver.findElements(this.element);
    } catch (e) {
      fail('WaitException: object is not a valid locator: ' + this.element.toString());
    }
    var element = this.element;
    var nt = waitFor(function() {
      return driver.findElements(element).size() > 0;
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element present: ' + element.toString());
    }
  };

  this.notPresent = function() {
    var driver = this.driver;
    try {
      this.driver.findElements(this.element);
    } catch (e) {
      fail('WaitException: object is not a valid locator: ' + this.element.toString());
    }
    var element = this.element;
    var nt = waitFor(function() {
      return driver.findElements(element).size() < 1;
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element not present: ' + element.toString());
    }
  };

  /**********************************************************************************
   *   Wait for an element to be displayed or not by using the                      *
   *   WebElement.isDisplayed method. Since this looks for a specific element using *
   *   WebDriver.findElement, it will error immediately if the element isn't        *
   *   already in the DOM. Sometimes you may need to wait for an element to be      *
   *   attached, then wait for the page to make it visible, depending on how a site *
   *   is designed.                                                                 *
   **********************************************************************************/
  this.visible = function() {
    var driver = this.driver;
    try {
      this.driver.findElement(this.element);
    } catch (e) {
      fail('WaitException: unable to locate element: ' + this.element.toString());
    }
    var element = this.element;
    var nt = waitFor(function() {
      return driver.findElement(l).isDisplayed();
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element to be visible: ' + element.toString());
    }
  };

  this.notVisible = function() {
    var driver = this.driver;
    try {
      this.driver.findElement(this.element);
    } catch (e) {
      fail('WaitException: unable to locate element: ' + this.element.toString());
    }
    var element = this.element;
    var nt = waitFor(function() {
      return !driver.findElement(l).isDisplayed();
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element to not be visible: ' + element.toString());
    }
  };

}