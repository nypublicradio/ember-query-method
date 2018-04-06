ember-query-method
==============================================================================

![Download count all time](https://img.shields.io/npm/dt/ember-query-method.svg) [![npm version](https://badge.fury.io/js/ember-query-method.svg)](http://badge.fury.io/js/ember-query-method) [![CircleCI](https://circleci.com/gh/nypublicradio/ember-query-method.svg?style=shield)](https://circleci.com/gh/nypublicradio/ember-query-method) [![Ember Observer Score](http://emberobserver.com/badges/ember-query-method.svg)](http://emberobserver.com/addons/ember-query-method)

Run a method when a query parameter is detected.

Installation
------------------------------------------------------------------------------

```
ember install ember-query-method
```

Usage
------------------------------------------------------------------------------
This addon provides a mixin that will run a method if a matching query parameter is found. The method can be defined on any lookup-able object in the container and will be passed the values from the url.

There are two sets of requirements for this mixin to function properly.




* `git clone <repository-url>`
* `cd ember-query-method`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
