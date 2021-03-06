import Route from '@ember/routing/route';
import QueryMethodMixin from 'ember-query-method/mixins/query-method';

export default Route.extend(QueryMethodMixin, {
  factory: 'object:foo',
  method: 'foo',
});
