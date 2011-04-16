// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same precondition */

// NOTE: it is very important to make sure that the element is not created 
// until the view is actually visible in the window.

module("SC.View#element");

test("returns null if the view has no element and no parent view", function() {
  var view = SC.View.create() ;
  equals(view.get('parentView'), null, 'precond - has no parentView');
  equals(view.get('element'), null, 'has no element');
});

test("returns null if the view has no element and parent view has no element", function() {
  var parent = SC.View.create({
     childViews: [ SC.View.extend() ]
  });
  var view = parent.childViews[0];
  
  equals(view.get('parentView'), parent, 'precond - has parent view');
  equals(parent.get('element'), null, 'parentView has no element');
  equals(view.get('element'), null, ' has no element');
});

test("returns element if you set the value", function() {
  var view = SC.View.create();
  equals(view.get('element'), null, 'precond- has no element');
  
  var dom = document.createElement('div');
  view.set('element', dom);
  
  equals(view.get('element'), dom, 'now has set element');
  
  dom = null;
});

var parent, child, parentDom, childDom ;
module("SC.View#element - autodiscovery", {
  setup: function() {

    parent = SC.View.create({
       childViews: [ SC.View.extend({
         // redefine this method in order to isolate testing of element prop.
         // simple version just returns firstChild of parentElement.
         findElementInParentElement: function(parentElement) {
           return parentElement.firstChild;
         }
       }) ]
    });
    child = parent.childViews[0];

    // setup parent/child dom
    parentDom = document.createElement('div');
    childDom = document.createElement('div');
    parentDom.appendChild(childDom);
    
    // set parent element...
    parent.set('element', parentDom);
  },
  
  teardown: function() {
    parent = child = parentDom = childDom = null ;
  }
});

test("discovers element if has no element but parent view does have element", function() {  
  equals(parent.get('element'), parentDom, 'precond - parent has element');
  ok(!!parentDom.firstChild, 'precond - parentDom has first child');
  
  equals(child.get('element'), childDom, 'view discovered child');
});

test("once its discovers element, returns the same element, even if you remove it from the parent view", function() {  
  equals(child.get('element'), childDom, 'precond - view discovered child');
  parentDom.removeChild(childDom) ;

  equals(child.get('element'), childDom, 'view kept element cached (i.e. did not do a discovery again)');
});

module("SC.View#element - destroying");

test("returns null again if it has element and element is destroyed");

test("returns null again if parent view's element is destroyed");

var view ;
module("SC.View#$", {
  setup: function() {
    view = SC.View.extend({
      render: function(context, firstTime) {
        context.push('<span></span>');
      }
    }).create();

    view.append();
  },
  
  teardown: function() {
    view.remove();
  }
});

test("returns an empty jQuery object if no element", function() {
  var v = SC.View.create();
  ok(!v.get('element'), 'precond - should have no element');
  equals(v.$().size(), 0, 'should return empty jQuery object');
  equals(v.$('span').size(), 0, 'should return empty jQuery object even if filter passed');
});

test("returns jQuery object selecting element if provided", function() {
  ok(view.get('element'), 'precond - should have element');
  
  var cq = view.$();
  equals(cq.size(), 1, 'view.$() should have one element');
  equals(cq.get(0), view.get('element'), 'element should be element');
});

test("returns jQuery object selecting element inside element if provided", function() {
  ok(view.get('element'), 'precond - should have element');
  
  var cq = view.$('span');
  equals(cq.size(), 1, 'view.$() should have one element');
  equals(cq.get(0).parentNode, view.get('element'), 'element should be in element');
});

test("returns empty jQuery object if filter passed that does not match item in parent", function() {
  ok(view.get('element'), 'precond - should have element');
  
  var cq = view.$('body'); // would normally work if not scoped to view
  equals(cq.size(), 0, 'view.$(body) should have no elements');
});
