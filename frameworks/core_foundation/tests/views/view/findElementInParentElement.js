// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same */

// ..........................................................
// createChildViews()
// 
var view, parentDom, childDom, elementId ;
module("SC.View#findElementInParentElement", {
  setup: function() {
    
    elementId = 'foo-123';
    
    // manually construct a test element.  next childDom a few elements deep
    childDom = document.createElement('div');
    SC.$(childDom).attr('id', elementId);
    
    var intermediate = document.createElement('div');
    intermediate.appendChild(childDom);
    
    parentDom = document.createElement('div');
    parentDom.appendChild(intermediate);
    intermediate = null;
    
    
    // setup view w/ elementId
    view = SC.View.create({ elementId: elementId });
  },
  
  teardown: function() {
    view = parentDom = childDom = elementId = null;
  }
});

test("discovers element by finding element with matching elementId - when DOM is in document already", function() {
  document.body.appendChild(parentDom);
  equals(view.findElementInParentElement(parentDom), childDom, 'should find childDom');
  document.body.removeChild(parentDom); // cleanup or else next test may fail
});

test("discovers element by finding element with matching elementId - when parent DOM is NOT in document", function() {
  if(parentDom.parentNode) equals(parentDom.parentNode.nodeType, 11, 'precond - NOT in parent doc');
  else equals(parentDom.parentNode, null, 'precond - NOT in parent doc');
  equals(view.findElementInParentElement(parentDom), childDom, 'found childDom');
});

