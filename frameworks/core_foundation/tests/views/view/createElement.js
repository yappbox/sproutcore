// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same Q$ */

// ..........................................................
// createElement()
// 
module("SC.View#createElement");

test("returns the receiver", function() {
  var v= SC.View.create();
  equals(v.createElement(), v, 'returns receiver');
});

test("calls renderToContext() and sets element to resulting element", function() {
  var v= SC.View.create({
    tagName: 'span',
    
    renderToContext: function(context, firstTime) {
      context.push("foo");
    }
  });
  
  equals(v.get('element'), null, 'precondition - has no element');
  v.createElement();
  
  var elem = v.get('element');
  ok(!!elem, 'has element now');
  equals(elem.innerHTML, 'foo', 'has innerHTML from context');
  equals(elem.tagName.toString().toLowerCase(), 'span', 'has tagName from view');
  elem = null ;
});

test("invokes didCreateElement() on receiver and all child views", function() {
  var callCount = 0;
  var v= SC.View.create({
    
    didCreateElement: function() { callCount++; },
    
    childViews: [SC.View.extend({
      didCreateElement: function() { callCount++; },
      childViews: [SC.View.extend({
        didCreateElement: function() { callCount++; }
      }), SC.View.extend({ /* no didCreateElement */ })]
    })]
  });
  
  // verify setup...
  ok(v.didCreateElement, 'precondition - has root');
  ok(v.childViews[0].didCreateElement, 'precondition - has firstChild');
  ok(v.childViews[0].childViews[0].didCreateElement, 'precondition - has nested child');
  ok(!v.get('element'), 'has no element');

  v.createElement();
  equals(callCount, 3, 'did invoke all methods');
});

test("generated element include HTML from child views as well", function() {
  var v = SC.View.create({
    childViews: [ SC.View.extend({ elementId: "foo" })]
  });
  
  v.createElement();
  ok(Q$('#foo', v.get('element')).get(0), 'has element with child elementId');
});

test("does NOT assign element to child views immediately", function() {
  var v = SC.View.create({
    childViews: [ SC.View.extend({ elementId: "foo" })]
  });
  v.createElement();
  ok(!v.childViews[0]._view_element, 'has no element yet');
});

// ..........................................................
// USE CASES
// 

// when view is first created, createElement is NOT called

// when view is added to parent view, and parent view is already visible in
// window, element is created just before adding it to the DOM

// when a pane is added to the window, the pane element is created.

// when a pane with an exiting element is removed from the DOM, the element is removed from the DOM, but it is not destroyed.

// what if we move a view from a parentView that has a element to a parentView that does NOT have a element.   Delete element.

// what if a move a view from a parentView that does NOT have a element to a parentView that DOES have a element.
