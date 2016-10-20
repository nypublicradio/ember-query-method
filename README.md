# ember-query-method

Run a method when a query parameter is detected.

## Installation

```sh
$ ember install ember-query-method
```

## Usage

This addon provides a mixin that will run a method if a matching query parameter is found. The method can be defined on any lookup-able object in the container and will be passed the values from the url.

There are two sets of requirements for this mixin to function properly.

### Requirements

#### 1. Query Parameters

`ember-query-method` will invoke a method at the key specified as your query parameter, so you must set up a controller to bind query parameters.

#### 2. Attributes
`ember-query-method` requires three attributes to be accessible to the `QueryMethodMixin` at runtime. You can define these on the mixin's target or else import and overwrite the mixin in your app's namespace to use the same values in all cases.

##### `method` *String*

The name of the function to be run when a route with this mixin is entered into. This value must be specified as a `queryParam` on the `targetController`, which defaults to the application controller.

When this function is run it will be passed the value of the query parameter as the first argument. If the parameter merely exists without a value, this method will be passed `'true'`. **Note** that's a string, not the boolean value.

**Default:** `''`

##### `factory` *String*

The `<factory type>:<factory name>` string used to lookup the object on which your method is defined.

**Default:** `''`

##### `targetController` *String*

By default the mixin will check the application controller, but if there's a different controller on which the query parameters are defined, specify it here.

**Default:** `'application'`

### Examples

```javascript
// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['showComments'],
  showComments: null
});

// app/routes/some-route.js
import Ember from 'ember';
import QueryMethodMixin from 'ember-query-method/mixins/query-method';

export default Ember.Route.extend(QueryMethodMixin, {
  factory: 'component:comments',
  method: 'showComments'
});

// app/components/comments.js
import Ember from 'ember';

export default Ember.Component.extend({
  showComments(page) {
    // when /some-route?showComments=5 is entered, this function will be run
    // with 5 as the argument.
    // when the route is exited, the showComments query param will be cleared
  }
});

// an example of overwriting the mixin with your app's requirements
// app/mixins/query-method.js
import QueryMethodMixin from 'ember-query-method/mixins/query-method';

export default QueryMethodMixin.reopen({
  factory: 'component:comments',
  method: 'showComments'
});

// app/routes/some-route.js
import Ember from 'ember';
import QueryMethodMixin from 'ember-query-method/mixins/query-method';

export default Ember.Route.extend(QueryMethodMixin, {
});

// app/routes/some-other-route.js
import Ember from 'ember';
import QueryMethodMixin from 'ember-query-method/mixins/query-method';

export default Ember.Route.extend(QueryMethodMixin, {
});
```


## Development

* `git clone https://github.com/nypublicradio/ember-query-method`
* `cd ember-query-method`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
