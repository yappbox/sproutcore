// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/** @class */

SC.CheckboxSupport = /** @scope SC.CheckboxSupport.prototype */{
  change: function() {
    this.notifyPropertyChange('value');
  },

  value: function(key, value) {
    if (value !== undefined) {
      this.$('input').attr('checked', value);
    } else {
      value = this.$('input').attr('checked');
    }

    return value;
  }.property().idempotent()
};

