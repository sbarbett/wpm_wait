Methods for waiting for things using WebDriver in WPM

How to use
==========

Just put the code into your script somehow. You can copy/paste, download and eval directly from GitHub with:

```javascript
var c = openHttpClient();
eval(c.get('https://raw.githubusercontent.com/sbarbett/wpm_wait/master/src/Wait.js').getBody()+'');
eval(c.get('https://raw.githubusercontent.com/sbarbett/wpm_wait/master/src/WaitForElement.js').getBody()+'');
eval(c.get('https://raw.githubusercontent.com/sbarbett/wpm_wait/master/src/WaitForText.js').getBody()+'');
eval(c.get('https://raw.githubusercontent.com/sbarbett/wpm_wait/master/src/WaitForAlert.js').getBody()+'');
```

...or upload the files to your WPM account and use include:

```javascript
include('Wait')
include('WaitForElement')
include('WaitForText')
include('WaitForAlert')
```

Instantiate a 'wait' object using your active WebDriver instance and a timeout value in milliseconds.

```javascript
var driver = openBrowser();
var wait = new Wait(driver, 30000);
```
