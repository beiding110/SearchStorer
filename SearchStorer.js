(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.SearchStorer = factory());
}(this, function () {
    function SearchStorer(obj) {
        this.init(obj);
    };

    SearchStorer.prototype = {
        init: function(obj) {
            this.mount(obj);

            this.$nameHeader = this.$settings.header || 'search-session-';
        },
        mount: function(obj) {
            this.$settings = obj || {};
        },
        getSessionName: function() {
            this.$pathName = (window.location.pathname + window.location.search + window.location.hash);
            this.$sessionName = this.$nameHeader + this.$pathName;
            return this.$sessionName;
        },
        mapData: function(data) {
            var queryData = {};

            Object.keys(data).forEach(function(key) {
                if(data[key].el) {
                    queryData[key] = document.querySelector(data[key].el).value;
                } else {
                    if(data[key].data) {
                        queryData[key] = data[key].data;
                    } else {
                        queryData[key] = data[key];
                    };
                };
            });

            return queryData;
        },
        setSession: function(data) {
            var sessionName = this.getSessionName();
            window.sessionStorage[sessionName] = JSON.stringify(data);
            return true;
        },
        getSession: function() {
            var sessionName = this.getSessionName();
            var session = window.sessionStorage[sessionName];
            return session ? JSON.parse(session) : {};
        },
        $set: function(data) {
            var queryData = this.mapData(data);

            if(this.setSession(queryData)) {
                return true;
            } else {
                return false;
            };
        },
        $get: function() {
            return this.getSession();
        }
    };

    return SearchStorer;
}));