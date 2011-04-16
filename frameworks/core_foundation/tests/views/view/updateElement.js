// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same */

// NOTE: This file tests both updateElement() and the related methods that 
// will trigger it.

// ..........................................................
// TEST: updateElement()
// 
module("SC.View#updateElement");

test("invokes renderElementSettings() and then updates element", function() {
  var times = 0;
  var view = SC.View.create({
    _renderElementSettings: function() {
      times++;
      this.$().addClass('did-update-' + times);
    }
  });
  view.createElement();
  view.updateElement();
  debugger;
  ok(view.$().attr('class').indexOf('did-update-2')>=0, 'has class name added by prepareContext()');
});

// ..........................................................
// TEST: updateElementIfNeeded()
// 
var view, callCount ;
// module("SC.View#updateElementIfNeeded", {
//   setup: function() {
//     // setup a fake view class so that updateElementIfNeeded() will call
//     // updateElement() if needed.  updateElement() is faked to isolate test
//     view = SC.View.create({
//       isVisibleInWindow: YES,
//       updateElement: function() { callCount++; }
//     });
//     callCount = 0 ;
    
//     view.createElement();
//     view.set("layerNeedsUpdate", YES);
//   }
  
// });

// test("does not call updateElement if layerNeedsUpdate is NO", function() {
//   view.set('layerNeedsUpdate', NO);
//   view.updateElementIfNeeded();
//   equals(callCount, 0, 'updateElement did NOT run');
// });

// test("does not call updateElement if isVisibleInWindow is NO", function() {
//   view.set('isVisibleInWindow', NO);
//   view.updateElementIfNeeded();
//   equals(callCount, 0, 'updateElement did NOT run');
// });

// test("does call updateElement() if isVisible & layerNeedsUpdate", function() {
//   equals(view.get('isVisibleInWindow'), YES, 'precond - isVisibleInWindow');
//   equals(view.get('layerNeedsUpdate'), YES, 'precond - layerNeedsUpdate');
  
//   view.updateElementIfNeeded();
//   ok(callCount > 0, 'updateElement() did run');
// });

// test("resets layerNeedsUpdate to NO if called", function() {
//   equals(view.get('layerNeedsUpdate'), YES, 'precond - layerNeedsUpdate');
//   view.updateElementIfNeeded();
//   equals(view.get('layerNeedsUpdate'), NO, 'layerNeedsUpdate reset to NO');
// });

// test("returns receiver", function() {
//   equals(view.updateElementIfNeeded(), view, 'returns receiver');
// });

// test("only runs updateElement() once if called multiple times (since layerNeedsUpdate is set to NO)", function() {
//   callCount = 0;
//   view.updateElementIfNeeded().updateElementIfNeeded().updateElementIfNeeded();
//   equals(callCount, 1, 'updateElement() called only once');
// });

// // ..........................................................
// // TEST: layerNeedsUpdate auto-trigger
// // 
// module("SC.View#layerNeedsUpdate auto-triggers", {
//   setup: function() {
//     // use fake method to isolate call...
//     view = SC.View.create({
//       updateElementIfNeeded: function() { callCount++; }
//     });
//     callCount = 0;
//   }
// });

// test("setting layerNeedsUpdate calls updateElementIfNeeded at end of runloop", function() {
//   SC.RunLoop.begin();
//   view.set('layerNeedsUpdate', YES);
//   SC.RunLoop.end();
  
//   equals(callCount, 1, 'updateElementIfNeeded did run');  
// });

// test("setting & resetting only triggers updateElementIfNeeded once per runloop", function() {
//   SC.RunLoop.begin();
//   view.set('layerNeedsUpdate', YES)
//       .set('layerNeedsUpdate', NO)
//       .set('layerNeedsUpdate', YES);
//   SC.RunLoop.end();
  
//   equals(callCount, 1, 'updateElementIfNeeded did run');  
// });

// // ..........................................................
// // INTEGRATION SCENARIOS
// // 

// module("SC.View#updateElement - integration");

// test("layerNeedsUpdate actually triggers updateElement", function() {
//   var callCount = 0 ;
//   var layer = document.createElement('div');
//   var view = SC.View.create({
//     isVisibleInWindow: YES,
//     updateElement: function() { callCount++; }
//   });
//   view.createElement();
  
//   SC.RunLoop.begin();
//   view.set('layerNeedsUpdate', YES);
//   SC.RunLoop.end();
  
//   equals(callCount, 1, 'updateElement did run b/c layerNeedsUpdate is YES');
//   callCount = 0 ;
  
//   SC.RunLoop.begin();
//   view.set('layerNeedsUpdate', YES);
//   view.set('layerNeedsUpdate', NO);
//   SC.RunLoop.end();
  
//   equals(callCount, 0, 'updateElement did NOT run b/c layerNeedsUpdate is NO');
// });

