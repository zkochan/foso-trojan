#Foso Trojan

A JavaScript snippet aimed to add the [Foso](https://github.com/zkochan/foso) scripts to the webpage.

[![Dependency Status](https://david-dm.org/zkochan/foso-trojan/status.svg?style=flat)](https://david-dm.org/zkochan/foso-trojan)
[![Build Status](https://travis-ci.org/zkochan/foso-trojan.svg)](https://travis-ci.org/zkochan/foso-trojan)
[![npm version](https://badge.fury.io/js/foso-trojan.svg)](http://badge.fury.io/js/foso-trojan)

## Install

Add the code from `foso.trojan.js` to all the pages of the website.

Pass the name of the script that has to be added to each page type accordingly.

```javascript
//E.g., on homepage
foso('homepage');
```

**NOTE:** If not specified, the js file called index.js will be added to the page.

## Usage

Open the console in the browser and execute `foso.on()` in order to attach the Foso scripts to the page.

To stop working with Foso just execute `foso.off()`

License
========

The MIT License (MIT)
