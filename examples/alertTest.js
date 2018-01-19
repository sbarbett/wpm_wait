include('Wait')
include('WaitForAlert')
// For some reason Firefox automatically dismisses alerts on WPM
var driver = openBrowser('CHROME');
var wait = new Wait(driver, 30000)

beginTransaction(function(tx) {

  beginStep('Load W3C alert example page', function(step) {
    driver.get('https://www.w3schools.com/jsref/met_win_alert.asp');
  });

  beginStep('Trigger an alert box after 5 seconds', function(step) {
    driver.executeScript('setTimeout(function(){alert("Hello! I am an alert box!!")}, 5000);');
    wait.forAlert().present();
  });

  beginStep('Accept alert and wait for it to no longer be present', function(step) {
    driver.switchTo().alert().accept();
    wait.forAlert().notPresent();
  });

  beginStep('Click home and wait for page to load', function(step) {
    driver.findElement(By.xpath('//a[@class="w3schools-logo"]')).click();
    wait.forPageToLoad();
  });

});