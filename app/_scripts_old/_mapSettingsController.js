/*old-jslint indent: 2, unparam: true, plusplus: true */
/*
jslint
    devel: true,
    browser: true,
    node: false
*/
/*
global
    deferred: true
*/

'use strict';

deferred.load.mapSettings.resolve();


// Auto-save / restore forms (with id) from cookies
/*$(window).on('load', function () {
    $('[data-anchor="map_settings"]').find('form[id].sayt').each(function () {
        var $el = $(this);
        $el.sayt(options.sayt);
        // $el.find(':input').trigger('change');
        console.log('#' + $el.attr('id') + ' restored from cookies');
    });
});*/

/*
var checkbox = document.createElement('input');
checkbox.setAttribute('type','checkbox');
new ol.dom.Input(checkbox).bindTo('checked',layer,'visible');
document.body.appendChild(checkbox);
*/
deferred.ready.mapSettings.resolve();



