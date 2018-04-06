import EmberObject from '@ember/object';
import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | query method', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /query-method', async function(assert) {
    await visit('/query-method');

    assert.equal(currentURL(), '/query-method');
  });

  test('calls the matched method with the given argument on the specified factory', async function(assert) {
    let mock = EmberObject.extend({
      foo() {
        assert.ok('foo was called on mock');
      }
    });

    this.owner.register('object:foo', mock);
    await visit('/query-method?foo=bar');
  });

  test('calls the matched method even if the value is undefined', async function(assert) {
    let mock = EmberObject.extend({
      foo() {
        assert.ok('foo was called on mock');
      }
    });

    this.owner.register('object:foo', mock);
    await visit('/query-method?foo');
  });

  test('params are cleared between route transitions', async function(assert) {
    assert.expect(4);
    let count = 0;
    let mock = EmberObject.extend({
      foo() {
        count++;
        assert.ok('foo was called on mock');
      }
    });
    this.owner.register('object:foo', mock);

    await visit('/query-method?foo=bar');

    assert.equal(currentURL(), '/query-method?foo=bar', 'url should have params');
    await click('a');
    assert.equal(currentURL(), '/', 'homepage should not have a query param');
    assert.equal(count, 1, 'foo should only be called once');
  });
});
