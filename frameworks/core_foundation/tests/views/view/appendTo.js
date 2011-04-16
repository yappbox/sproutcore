module("SC.View - append() and appendTo()");

test("should be added to the specified element when calling append()", function() {
  htmlbody('<div id="menu"></div>');

  var view = SC.View.create({
    elementId: 'the-view',

    render: function(context) {
      context.push('foo bar baz');
      return sc_super();
    }
  });

  ok(!view.get('element'), "precond - should not have an element");
  view.appendTo('#menu');

  var viewElem = SC.$('#menu').children();
  ok(viewElem.length > 0, "creates and appends the view's element");
});

test("should be added to the document body when calling appendTo()", function() {
  htmlbody('<div id="menu"></div>');

  var view = SC.View.create({
    elementId: 'the-view',

    render: function(context) {
      context.push('foo bar baz');
      return sc_super();
    }
  });

  ok(!view.get('element'), "precond - should not have an element");
  view.append();

  var viewElem = SC.$(document.body).find(':contains("foo bar baz")');
  ok(viewElem.length > 0, "creates and appends the view's element");
});

