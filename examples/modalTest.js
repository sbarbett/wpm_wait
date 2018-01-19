include('Wait')
include('WaitForElement')
var driver = openBrowser();
var wait = new Wait(driver, 30000)

beginTransaction(function(tx) {
  var modalClose = By.xpath('//button[text()="Close"]')

  beginStep('Load W3C Bootstrap Modal example page', function(step) {
    driver.get('https://www.w3schools.com/bootstrap/bootstrap_modal.asp');
  });

  beginStep('Trigger modal and wait for it to be visible', function(step) {
    driver.findElement(By.xpath('//button[text()="Click To Open Modal"]')).click();
    wait.forElement(modalClose).visible();
  });

  beginStep('Dismiss modal and wait for it to no longer be visible', function(step) {
    driver.findElement(modalClose).click();
    wait.forElement(modalClose).notVisible();
  });

  beginStep('Click "Next" and wait for the page to load', function(step) {
    driver.findElement(By.linkText('Next \u276F')).click();
    wait.forPageToLoad();
  });

});