// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same Q$ */

module("SC.View#destroyElement");

test("it if has no element, does nothing", function() {
  var callCount = 0;
  var view = SC.View.create({ 
    willDestroyElement: function() { callCount++; }
  });
  ok(!view.get('element'), 'precond - does NOT have element');
  
  view.destroyElement();
  equals(callCount, 0, 'did not invoke callback');
});

test("if it has a element, calls willDestroyElement on receiver and child views then deletes the element", function() {
  var callCount = 0;
  
  var view = SC.View.create({
    willDestroyElement: function() { callCount++; },
    childViews: [SC.View.extend({
      // no willDestroyElement here... make sure no errors are thrown
      childViews: [SC.View.extend({
        willDestroyElement: function() { callCount++; }
      })]
    })]
  });
  view.createElement();
  ok(view.get('element'), 'precond - view has element');
  
  view.destroyElement();
  equals(callCount, 2, 'invoked destroy element');  
  ok(!view.get('element'), 'view no longer has element');
});

test("returns receiver", function() {
  var view = SC.View.create().createElement();
  equals(view.destroyElement(), view, 'returns receiver');
});

test("removes element from parentNode if in DOM", function() {
  var view = SC.View.create();
  var element = view.createElement().get('element');
  
  ok(element, 'precond - has element');
  document.body.appendChild(element); // add to document body
  
  view.destroyElement();

  if(element.parentNode) equals(element.parentNode.nodeType, 11, 'element no longer in parent node');
  else equals(element.parentNode, null, 'element no longer in parent node');
  element = null; // cleanup
});


