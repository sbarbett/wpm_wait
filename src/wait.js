function Wait(d, t) {
  if (typeof d === 'object') {
    var r = /^WebmetricsWebDriver:\s.*\son\s.*\s\(.*\)/i
    if (!r.test(d.toString())) {
      fail('WaitException: object is not a valid WebDriver instance')
    };
  } else {   
    fail('WaitException: WebDriver object required');
  };
  if (typeof t === 'undefined') {
    fail('WaitException: timeout value required');
  };
  if (typeof t !== 'number') {
    t = Number(t);
    if (isNaN(t)) {
      fail('WaitException: timeout value is NaN');
    };
  };
  this.driver = d;
  this.timeout = t;
  this.forPageToLoad = function() {
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.executeScript('return document.readyState;').equals('complete');
    }, this.timeout)
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for page to load');
    }
  };
  this.forElementPresent = function(l) {
    if (typeof l === 'object') {
      try {
        this.driver.findElements(l);
      } catch (e) {
        fail('WaitException: object is not a valid locator: ' + l.toString());
      };
    } else {
      fail('WaitException: locator object required');
    };
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.findElements(l).size() > 0;
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element: ' + l.toString())
    }
  }
  this.forVisible = function(l) {
    if (typeof l === 'object') {
      try {
        this.driver.findElement(l);
      } catch (e) {
        fail('WaitException: unable to locate element: ' + l.toString());
      };
    } else {
      fail('WaitException: locator object required');
    };
    var driver = this.driver;
    var nt = waitFor(function() {
      return driver.findElement(l).isDisplayed();
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for element to be visible: ' + l.toString());
    }
  }
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
  }
};