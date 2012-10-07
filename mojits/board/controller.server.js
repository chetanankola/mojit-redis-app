/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('board', function (Y, NAME) {

/**
 * The board module.
 *
 * @module board
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        init: function (config) {
            this.config = config;
            this.db = this.config.db || 'mlh';
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function (ac) {
            ac.assets.addCss('./index.css', 'top');
            if (ac.params.getFromRoute('call') === 'getLastEntry') {
                return this.getLastEntry(ac);
            }
            if (ac.params.getFromRoute('call') === 'getFirstEntry') {
                return this.getFirstEntry(ac);
            }
            if (ac.params.getFromRoute('call') === 'showAllArticles') {
                return this.showAllArticles(ac);
            }
            if (ac.params.getFromRoute('call') === 'addArticle') {
                return this.addArticle(ac);
            }
            if (ac.params.getFromRoute('call') === 'deleteArticle') {
                Y.log('deleteArticle', 'warn');
                return this.deleteArticle(ac, ac.params.getFromRoute('id'));
            }
            //return this.deleteEntry(ac, 218);
            return this.showAllArticles(ac);
        },

        showAllArticles: function (ac) {
            var output =  [],
                finalOutput = {},
                redis = require("redis"),
                client = redis.createClient(),
                i,
                db = this.db;

            client.hvals(db, function (err, replies) {
                if (err) {
                    ac.done();
                    return console.error("error response - " + err);
                }
                for (i = 0; i < replies.length; i++) {
                    output[i] = JSON.parse(replies[i].toString());//JSON.parse(replies[i]);
                    //Y.log(output[i], "warn");
                }
                if (replies.length === 0) {
                    finalOutput.empty = {msg: 'emptyDb'};
                }
                client.quit();
                finalOutput.output = output;
                //finalOutput.customMsg = {msg: 'meh meh you are a noobe'};
                ac.done(finalOutput);
            });
        },

        addArticle: function (ac) {
            var redis = require("redis"),
                client = redis.createClient(),
                searchTerm,
                i,
                self = this,
                db = this.db;

            client.on("error", function (err) {
                console.log("error event - " + client.host + ":" + client.port + " - " + err);
            });
            client.set("string key", "string val");//, redis.print);
            //client.hset("cars", "audi", "a5");//, redis.print);
            searchTerm = ac.params.getFromRoute('boardInputVal');
            if (searchTerm) {
                client.incr('nextid', function (err, id) {
                    if (err) {
                        return ac.done();
                    }
                    client.hset(db, 'articleId:' + id, JSON.stringify({
                        key: 'articleId:' + id,
                        id: id,
                        value: searchTerm
                    }));//, redis.print);
                    client.quit();
                    return self.showAllArticles(ac);
                });
            } else {
                client.quit();
                ac.done();
            }
        },

        getFirstEntry: function (ac) {
            var output =  {data: 'empty db'},
                redis = require("redis"),
                client = redis.createClient(),
                db = this.db;

            client.hvals(db, function (err, replies) {
                if (err) {
                    ac.done();
                    return console.error("error response - " + err);
                }
                if (replies.length > 0) {
                    output =  JSON.parse(replies[0].toString());
                }
                client.quit();
                ac.done({
                    output: output
                });
            });
        },

        deleteArticle: function (ac, id) {
            Y.log('deleteEntry function', 'warn');
            console.log(id);
            var output,
                self = this,
                redis = require("redis"),
                client = redis.createClient(),
                db = this.db;
            client.hdel(db, 'articleId:' + id, function () {
                return self.showAllArticles(ac);
            });
            client.quit();
        },

        getLastEntry: function (ac) {
            var output,
                redis = require("redis"),
                client = redis.createClient(),
                db = this.db;
            client.hvals(db, function (err, replies) {
                if (err) {
                    ac.done();
                    return console.error("error response - " + err);
                }
                if (replies.length <= 0) {
                    return ac.done();
                }
                output = replies[replies.length - 1];
                Y.log(output, 'warn');
                output =  JSON.parse(output.toString());
                client.quit();
                ac.done({
                    output: output
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'boardModelFoo', 'json-parse']});
