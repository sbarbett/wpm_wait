function WaitForAlert(d, t) {
  this.driver = d;
  this.timeout = t;

  /**********************************************************************************
   *   Wait for an alert to be present. Using a try...catch, try to switch to an    *
   *   existing dialogue and return true, otherwise return false.                   *
   **********************************************************************************/
  this.present = function() {
    var driver = this.driver;
    var nt = waitFor(function() {
      while (true) {
        try {
          driver.switchTo().alert();
          return true;
        } catch (e) {
          return false;
        }
      }
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for alert');
    }
  };

  this.notPresent = function() {
    var driver = this.driver;
    var nt = waitFor(function() {
      while (true) {
        try {
          driver.switchTo().alert();
          return false;
        } catch (e) {
          return true;
        }
      }
    }, this.timeout);
    try {
      assertTrue(nt);
    } catch (e) {
      fail('WaitException: timed out waiting for not alert');
    }
  };

}