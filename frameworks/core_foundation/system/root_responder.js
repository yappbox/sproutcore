SC.RootResponder = SC.Object.extend({
  /**
    Route an action message to the appropriate responder.  This method will
    walk the responder chain, attempting to find a responder that implements
    the action name you pass to this method.  Set 'target' to null to search
    the responder chain.

    @param {String} action The action to perform - this is a method name.
    @param {SC.Responder} target object to set method to (can be null)
    @param {Object} sender The sender of the action
    @param {SC.Pane} pane optional pane to start search with
    @param {Object} context optional. only passed to ResponderContexts
    @returns {Boolean} YES if action was performed, NO otherwise
    @test in targetForAction
  */
  sendAction: function(action, target, sender, pane, context, firstResponder) {
    target = this.targetForAction(action, target, sender, pane, firstResponder) ;

    if (target && target.isResponderContext) {
      // If the target is a responder context (i.e., a responder chain), just
      // forward the action.
      return !!target.sendAction(action, sender, context, firstResponder);
    } else {
      return target && target.tryToPerform(action, sender);
    }
  },

  /**
    Attempts to determine the initial target for a given action/target/sender
    tuple.  This is the method used by sendAction() to try to determine the
    correct target starting point for an action before trickling up the
    responder chain.

    You send actions for user interface events and for menu actions.

    This method returns an object if a starting target was found or null if no
    object could be found that responds to the target action.

    Passing an explicit target or pane constrains the target lookup to just
    them; the defaultResponder and other panes are *not* searched.

    @param {Object|String} target or null if no target is specified
    @param {String} method name for target
    @param {Object} sender optional sender
    @param {SC.Pane} optional pane
    @param {firstResponder} a first responder to use
    @returns {Object} target object or null if none found
  */
  targetForAction: function(methodName, target, sender, pane, firstResponder) {
    if (target) {
      target = this.targetForPath(target, sender);
    }

    if (target.isResponderContext) { return target; }

    if (!target || !target.respondsTo(methodName)) {
      target = this.get('defaultResponder');
      target = this.targetForPath(target);
    }

    return target ;
  },

  targetForPath: function(path, sender) {
    if (SC.typeOf(path) === SC.T_STRING) {
      return SC.objectForPropertyPath(target) ||
             SC.objectForPropertyPath(target, sender);
    } else {
      return path;
    }
  },

  /**
    Set this to a delegate object that can respond to actions as they are sent
    down the responder chain.

    @type SC.Object
  */
  defaultResponder: null
});

/*
  Invoked when the document is ready, but before main is called.  Creates
  an instance and sets up event listeners as needed.
*/
SC.ready(SC.RootResponder, function() {
  SC.RootResponder.responder = SC.RootResponder.create() ;
});
