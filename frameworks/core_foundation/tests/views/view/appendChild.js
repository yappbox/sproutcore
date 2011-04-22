module("SC.CoreView - appendChild");

test("should append the element of another view when added as a child", function() {
  var parentView = SC.TemplateView.create({
    template: function() { return "foo"; }
  });

  var childView = SC.TemplateView.create({
    template: function() { return "bar"; }
  });

  parentView.append();
  equals(parentView.$().text(), "foo", "precond - appends parent to DOM");

  parentView.appendChild(childView);

  ok(childView.get('element'), "automatically creates DOM element");
  equals(parentView.$('div').text(), "bar", "appends child view to parent DOM");
  equals(parentView.get('childViews')[0], childView, "adds child to childViews array");
  equals(childView.get('parentView'), parentView, "sets parentView property of child");

  parentView.remove();
  equals(childView.get('element'), null, "removes child element when removing parent");
});

