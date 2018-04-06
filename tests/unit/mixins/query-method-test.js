import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import QueryMethodMixin from 'ember-query-method/mixins/query-method';
import { module, test } from 'qunit';

module('Unit | Mixin | query method', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let QueryMethodObject = EmberObject.extend(QueryMethodMixin);
    let subject = QueryMethodObject.create();
    assert.ok(subject);
  });

  test('didTransition action calls onDidTransition with correct value', function(assert) {
    let method = 'foo';
    let arg = 'bar';
    
    let QueryMethodObject = Route.extend(QueryMethodMixin, {
      method
    });
    
    let subject = QueryMethodObject.create({
      onDidTransition(param) {
        assert.equal(param, arg, 'onDidTransition was called with correct argument');
      },
      controllerFor() {
        return EmberObject.create({[method]: arg});
      }
    });
    
    subject.send('didTransition');
  });

  test('willTransition action clears the play param on the application controller', function(assert) {
    let method = 'foo';
    let arg = 'bar';
    let QueryMethodObject = Route.extend(QueryMethodMixin, {
      method
    });
    
    let applicationController = EmberObject.create({[method]: arg});
    let subject = QueryMethodObject.create({
      controllerFor() {
        return applicationController;
      }
    });
    subject.send('willTransition');
    
    assert.equal(applicationController.get(method), null, 'play attr should be null');
  });
});
