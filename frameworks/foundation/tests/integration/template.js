module("SC.TemplateView - Foundation Integration");

test("Template views can belong to a pane and a parent view", function() {
  var templates = SC.Object.create({
    toDo: SC.Handlebars.compile('<h1>{{title}}</h1> (Created at {{createdAt}})')
  });

  var didCreateLayerWasCalled = NO;

  var pane = SC.MainPane.design({
    childViews: ['container'],

    container: SC.View.design({
      childViews: ['normalView', 'template'],

      normalView: SC.View,

      template: SC.TemplateView.design({
        templates: templates,

        templateName: 'toDo',
        title: 'Do dishes',
        createdAt: "Today",

        didCreateLayer: function() {
          didCreateLayerWasCalled = YES;
        }
      })
    })
  });

  pane = pane.create().append();

  equals(pane.$().children().length, 1, "pane has one child DOM element");
  equals(pane.$().children().children().length, 2, "container view has two child DOM elements");
  equals(pane.$().children().children().eq(1).text(), "Do dishes (Created at Today)", "renders template to the correct DOM element");
  ok(didCreateLayerWasCalled, "didCreateLayer gets called on a template view after it gets rendered");
  pane.remove();
});

test("should invalidate frame cache when layer is created", function() {
  var pane = SC.MainPane.create().append();

  var view = SC.TemplateView.create({
    template: function() { return "foo"; }
  });

  var f = view.get('frame');
  ok(f, "precond - returns a frame object");
  equals(f.width, 0, "returns zero width because there is no layer");

  pane.appendChild(view);

  f = view.get('frame');
  ok(f, "returns frame object");
  equals(f.width, view.$().width(), "returns non-zero width");
  pane.remove();
});

test("should invalidate frame cache when appended to document", function() {
  var pane = SC.MainPane.create();

  var view = SC.TemplateView.create({
    template: function() { return "foo"; }
  });

  pane.appendChild(view);

  var f = view.get('frame');
  ok(f, "precond - returns a frame object");
  equals(f.width, 0, "returns zero width because there is no layer");

  pane.append();
  f = view.get('frame');
  ok(f, "returns frame object");
  equals(f.width, view.$().width(), "returns non-zero width");
  pane.remove();
});

