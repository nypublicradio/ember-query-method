import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

moduleForAcceptance('Acceptance | query method');

test('visiting /query-method', function(assert) {
  visit('/query-method');

  andThen(function() {
    assert.equal(currentURL(), '/query-method');
  });
});

test('calls the matched method with the given argument on the specified factory', function(assert) {
  let mock = Ember.Object.extend({
    foo() {
      assert.ok('foo was called on mock');
    }  
  });
  
  this.application.register('object:foo', mock);
  visit('/query-method?foo=bar');
  andThen(() => assert.equal(currentURL(), '/query-method?foo=bar'));
});

test('calls the matched method even if the value is undefined', function(assert) {
  let mock = Ember.Object.extend({
    foo() {
      assert.ok('foo was called on mock');
    }  
  });
  
  this.application.register('object:foo', mock);
  visit('/query-method?foo');
  andThen(() => assert.equal(currentURL(), '/query-method?foo'));
});

test('params are cleared between route transitions', function(assert) {
  assert.expect(4);
  let count = 0;
  let mock = Ember.Object.extend({
    foo() {
      count++;
      assert.ok('foo was called on mock');
    }  
  });
  this.application.register('object:foo', mock);
  
  visit('/query-method?foo=bar');
  
  andThen(() => {
    assert.equal(currentURL(), '/query-method?foo=bar', 'url should have params');
    click('a');
  });
  
  andThen(() => {
    assert.equal(currentURL(), '/', 'homepage should not have a query param');
    assert.equal(count, 1, 'foo should only be called once');
  });
  
});
