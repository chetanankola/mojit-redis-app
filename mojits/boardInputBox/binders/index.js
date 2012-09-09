/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('boardInputBoxBinderIndex', function(Y, NAME) {

/**
 * The boardInputBoxBinderIndex module.
 *
 * @module boardInputBoxBinderIndex
 */

    /**
     * Constructor for the boardInputBoxBinderIndex class.
     *
     * @class boardInputBoxBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            this.node = node;
            node.one('#board-input-box').on('key', function(e) {
                Y.fire('UPDATE_BOARD', {}, {
                  val: node.one('#board-input-box').get('value')
                });
                node.one('#board-input-box').set('value','');

            }, 'press:13');

            node.one('.show-all-article').on('click', function(e) {
                Y.fire('SHOW_ALL_ARTICLE', {}, {});
            });
 
            node.one('.show-last-article').on('click', function(e) {
                Y.fire('GET_LAST_ARTICLE', {}, {});
            });

            node.one('.show-first-article').on('click', function(e) {
                Y.fire('GET_FIRST_ARTICLE', {}, {});
            });
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client', 'event-key']});
