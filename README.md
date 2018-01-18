Methods for waiting for things using WebDriver in WPM

How to use
==========

Just get the code into your script somehow. You can copy/paste it, download and eval directly from GitHub with:

```javascript
eval(openHttpClient().get('https://raw.githubusercontent.com/sbarbett/wpm_wait/master/src/Wait.js').getBody()+'');
```

...or upload Wait.js directly to you WPM account and use include:

```javascript
include('Wait')
```

Instantiate using your active WebDriver instance and a timeout value in milliseconds.

```javascript
var driver = openBrowser();
var wait = new Wait(driver, 30000);
```

Example test using Google:

```javascript
include('Wait');
var driver = openBrowser();
var wait = new Wait(driver, 30000)

beginTransaction(function(tx) {
  beginStep(function(step) {
    driver.get('https://www.google.com');
    wait.forPageToLoad();
    wait.forElementPresent(By.id('lst-ib'));
    wait.forVisible(By.id('lst-ib'));
    wait.forTextPresent('Google Search');
  });
});
```