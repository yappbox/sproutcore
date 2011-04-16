// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: 2006-2011 Apple Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok same */

module("SC.View#prepareContext");

test("populates context with elementId & classNames from view if firstTime", function() {
  var view = SC.View.create({
    elementId: "foo", 
    classNames: ["bar"] 
  });
  var context = view.renderContext();
  
  // test with firstTime
  view.prepareContext(context, YES);
  equals(context.id(), 'foo', 'did set id');
  ok(context.hasClass('bar'), 'did set class names');
});

test("check that testing without first time still renders to a context", function() {
  var view = SC.View.create({
    elementId: "foo", 
    classNames: ["bar"],
    createRenderer: function(t) {  return undefined; }
  });
  var context = view.renderContext();
  view.prepareContext(context, NO);


  ok(context.id() === 'foo', 'set id');
  ok(context.hasClass('bar'), 'set class name');
});
test("adds sc-hidden class if view isVisible = NO", function() {

  var view = SC.View.create() ;
  var context ;
  
  context = view.renderContext();
  view.set('isVisible', YES);
  view.prepareContext(context, YES);
  ok(!context.hasClass('sc-hidden'), 'should NOT have sc-hidden class');
  
  context = view.renderContext();
  view.set('isVisible', NO);
  view.prepareContext(context, YES);
  ok(context.hasClass('sc-hidden'), 'should have sc-hidden class');  
});

test("invokes render() passing context & firstTime", function() {

	var runCount = 0;
  var context, isFirstTime ;
  var view = SC.View.create({
  	render: function(theContext, firstTime) {
  		equals(context, theContext, 'context passed');
  		equals(firstTime, isFirstTime, 'firstTime passed');
  		runCount++;
  	}
  }) ;
  
  context = view.renderContext();
  isFirstTime = YES;
	view.prepareContext(context, YES);  
	equals(runCount, 1, 'did invoke render()');

  runCount = 0 ;
  context = view.renderContext();
  isFirstTime = NO;
	view.prepareContext(context, NO);  
	equals(runCount, 1, 'did invoke render()');
});
