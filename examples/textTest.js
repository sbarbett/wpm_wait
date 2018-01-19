include('Wait')
include('WaitForText')
var driver = openBrowser();
var wait = new Wait(driver, 30000)

beginTransaction(function(tx) {

  beginStep('Load W3C homepage', function(step) {
    driver.get('https://www.w3schools.com/');
  });

  beginStep('Change "HTML" to "WPMTest1" after 5 seconds', function(step) {
    driver.executeScript('setTimeout(function(){document.evaluate("/html/body/div[7]/div[1]/div[1]/h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = "WPMTest1";},5000);');
    wait.forText('WPMTest1').present();
  });

  beginStep('After 5 more seconds, change it back to HTML', function(step) {
    driver.executeScript('setTimeout(function(){document.evaluate("/html/body/div[7]/div[1]/div[1]/h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = "HTML";},5000);');
    wait.forText('WPMTest1').notPresent();
  });

  beginStep('Click "Learn HTML" and wait for page to load', function(step) {
    driver.findElement(By.linkText('LEARN HTML')).click();
    wait.forPageToLoad();
  });

});