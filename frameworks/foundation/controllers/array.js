SC.ArrayController.reopen(SC.SelectionSupport, {
  _scac_arrayContentDidChange: function(original, start, removed, added) {
    original(start, removed, added);
    this.updateSelectionAfterContentChange();
  }.enhance(),

  _scac_ss_contentDidChange: function() {
    this.updateSelectionAfterContentChange();
  }.observes('content'),

  _scac_ss_enumerableDidChange: function() {
    this.updateSelectionAfterContentChange();
  }.observes('orderBy')
});
