import Ember from 'ember';
import { bind } from 'ember-runloop';
import get from 'ember-metal/get';

export default Ember.Mixin.create({
  targetController: 'application',
  factory: '',
  method: '',
  
  onDidTransition() {
    let factory = Ember.getOwner(this).lookup(get(this, 'factory'));
    factory[get(this, 'method')](...arguments);
  },
  onWillTransition() {
    let method = get(this, 'method');
    this.controllerFor(this.get('targetController')).set(method, null);
  },
  
  // check return value of super objects and respect if they don't
  //  want the event to bubble
  actions: {
    didTransition() {
      let methodKey = get(this, 'method');
      let methodArg = this.controllerFor(this.get('targetController')).get(methodKey);
      if (methodArg) {
        bind(this, get(this, 'onDidTransition'))(methodArg);
      }
      
      let ret = this._super(...arguments);
      return ret === false ? ret : true;
    },
    willTransition() {
      bind(this, get(this, 'onWillTransition'))();
      
      let ret = this._super(...arguments);
      return ret === false ? ret : true;
    }
  }
});
