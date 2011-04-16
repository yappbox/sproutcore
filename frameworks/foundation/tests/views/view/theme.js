// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test equals context ok */

module("SC.View#themes");

// TODO: This isn't passing on master. Alex needs to take a look at it.

//var t1 = SC.Theme.addTheme("sc-test-1", SC.BaseTheme.extend({name: 'test-1' }));
//var t2 = SC.Theme.addTheme("sc-test-2", SC.BaseTheme.extend({name: 'test-2' }));

test("changing themes propagates to child view.");
//test("changing themes propagates to child view.", function() {
  //var view = SC.View.create({
    //"childViews": "child".w(),
    //theme: "sc-test-1",
    //child: SC.View.extend({
      
    //})
  //});
  
  //ok(t1 === view.get("theme"), "view's theme should be sc-test-1");
  //ok(t1 === view.child.get("theme"), "view's child's theme should be sc-test-1");
  //view.set('themeName', 'sc-test-2');
  //ok(t2 === view.get("theme"), "view's theme should be sc-test-2");
  //ok(t2 === view.child.get("theme"), "view's child's theme should be sc-test-2");
//});

test("adding child to parent propagates theme to child view.");
//test("adding child to parent propagates theme to child view.", function() {
  //var child = SC.View.create({});
  //var view = SC.View.create({
    //theme: "sc-test-1"
  //});
  
  //ok(t1 === view.get("theme"), "view's theme should be sc-test-1");
  //equals(child.get("theme"), SC.Theme.find('sc-base'), "view's child's theme should start at base theme");
  //view.appendChild(child);
  //equals(t1, child.get("theme"), "view's child's theme should be sc-test-1");
//});

var Ace, Dark, Capsule, DarkCapsule, AceOnly;

module("SC.Theme", {
  setup: function() {
    // make and register Ace
    Ace = SC.Theme.create({
      name: 'ace',
      "classNames": ["ace"]
    });
    SC.Theme.addTheme(Ace);
    
    // Dark
    Dark = Ace.subtheme("dark");
    
    // Capsule
    Capsule = Ace.subtheme("capsule");
  },
  
  teardown: function() {
    
  }
});

// use this utility to check themes
function themeIs(themeInstance, shouldBe, classNames) {
  ok(themeInstance === shouldBe, "Correct theme");
  if (!themeInstance) return;

  var isOk = same(themeInstance.classNames, SC.Set.create(classNames), "Correct class names.");
}

test("Calling SC.Theme.find finds proper theme.", function(){
  var ace = SC.Theme.find("ace");
  themeIs(ace, Ace, ["ace"]);
});

test("There is no proliferation of theme registration (that is, subthemes are not registered globally)", function(){
  var dark = SC.Theme.find("dark");
  ok(!dark, "Theme should not be found.");
});

test("Calling find on a subtheme class finds proper theme.", function(){
  var dark = Ace.find("dark");

  // child themes are specialized
  themeIs(dark.baseTheme, Dark, ["ace", "dark"]);
});

test("Calling find on a theme instance finds proper theme.", function(){
  var ace = SC.Theme.find("ace");
  var dark = ace.find("dark");

  // child themes are specialized (that means derived by the parent theme)
  themeIs(dark.baseTheme, Dark, ["ace", "dark"]);
});

test("Calling find on a subtheme instance finds the proper theme.", function(){
  var dark = Ace.find("dark");
  var capsule = dark.find("capsule");

  // child themes are specialized (that is, derived by the parent)
  themeIs(capsule.baseTheme, Capsule, ["ace", "capsule"]);

  // and now we are testing said specialization
  themeIs(capsule, capsule, ["ace", "dark", "capsule"]);
});
