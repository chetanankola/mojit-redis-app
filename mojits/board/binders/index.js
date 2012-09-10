/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('boardBinderIndex', function (Y, NAME) {

/**
 * The boardBinderIndex module.
 *
 * @module boardBinderIndex
 */

    /**
     * Constructor for the boardBinderIndex class.
     *
     * @class boardBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function (mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */

        onRefreshView: function (node) {
            var self = this, Nav;

            //alert('refreshing');
            node.all('.article').on('click', function (e) {
                //alert('deleting article:' + e.currentTarget.get('id'));
                var args = {
                    params: {
                        route: {
                            call: 'deleteEntry',
                            id: e.currentTarget.get('id')
                        }
                    }
                };
                self.mojitProxy.refreshView(args);
            });
        },


        bind: function (node) {
            var me = this,
                self = this,
                thatNode = node,
                Nav;

            this.node = node;

            self.mojitProxy.refreshView();

            Nav = new Y.Nav({
                registry: [{
                    node: '#output',
                    pullToTop: false
                }],
                debug: false,
                styleContainer: true/*optional*/
            });

            /*setInterval(function(){
                var args = {
                    params: {
                        route: {
                            call:'getLastEntry'
                        }
                    }
                };
                self.mojitProxy.refreshView(args);
            }, 5000 );*/


            Y.on('SHOW_ALL_ARTICLE', function () {
                var args = {
                    params: {
                        route: {
                            call: 'showAllArticles'
                        }
                    }
                };
                self.mojitProxy.refreshView(args);
            });

            Y.on('GET_LAST_ARTICLE', function () {
                var args = {
                    params: {
                        route: {
                            call: 'getLastEntry'
                        }
                    }
                };
                self.mojitProxy.refreshView(args);
            });

            Y.on('GET_FIRST_ARTICLE', function () {
                var args = {
                    params: {
                        route: {
                            call: 'getFirstEntry'
                        }
                    }
                };
                self.mojitProxy.refreshView(args);
            });

            Y.on('UPDATE_BOARD', function (e, input) {
                var args = {
                    params: {
                        route: {
                            defer: true,
                            call: 'addArticle',
                            boardInputVal: input.val
                        }
                    }
                };
                this.mojitProxy.refreshView(args);
            }, this);

        }

    };

}, '0.0.1', {requires: ['gallery-navigate-easy', 'mojito-client', 'event-key']});
