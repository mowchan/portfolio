/**
 * @requires ../node_modules/webfontloader/webfontloader.js
 */

(function(window, document, WebFont) {
  'use strict';

  WebFont.load({
    google: {
      families: ['Roboto Condensed:300,300i,400,400i,700,700i', 'Roboto Mono:300,400']
    }
  });
})(window, document, WebFont);
