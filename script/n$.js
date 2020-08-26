(function (cnt) {

    /////////////////////////////////////////////////////////////////
    ////////////////////// Private Members //////////////////////////



    /////////////////////////////////////////////////////////////////
    //////////////// Privately Constructed Members //////////////////

    /** n$ namespace object **/
    var n$ = function (obj) {
        if (obj != null) {
            for (var item in this) {
                if (obj !== cnt || this[item] != this.n$) {
                    obj[item] = this[item];
                }
            }
            return obj;
        }
        return this;
    };
    n$.prototype.n$ =
        function (ns) {
            return cnt.n$(ns, this);
        };
    n$.prototype.n$extend =
    n$.prototype.n$ext =
    n$.prototype.n$e =
        function (obj) {
            for (var key in obj) {
                this[key] = obj[key];
            }
            return this;
        };
//    n$.prototype.n$insert =
//    n$.prototype.n$ins =
//    n$.prototype.n$i =
//        function (name, obj) {
//            this[name] = obj;
//            return this;
//        };
    n$.prototype.n$p =
    n$.prototype.n$pro =
    n$.prototype.n$provide =
        function (fn) {
            fn(this);
        };
    n$.prototype.n$i =
    n$.prototype.n$imp =
    n$.prototype.n$impose =
        function (fn) {
            fn.call(this);
        };

    /** n$ collection **/
    var n$array = function (arr) {
        if (arr != null) {
            for (var item in this) {
                arr[item] = this[item];
            }
            return arr;
        }
        return this;
    };
    n$array.prototype = [];
    n$array.prototype.constructor = n$array;
    n$array.prototype.n$provide =
        function (fn) {
            var params = [];
            for (var i = 0; i < this.length; i++) {
                params.push(this[i]);
            }
            fn.apply(window, params)
        };
    n$array.prototype.n$extend =
    n$array.prototype.n$ext =
    n$array.prototype.n$e =
        function (obj) {
            for (var i = 0; i < this.length; i++) {
                this[i].n$extend(obj);
            }
            return this;
        };
    n$array.prototype.n$insert =
    n$array.prototype.n$ins =
    n$array.prototype.n$i =
        function (name, obj) {
            for (var i = 0; i < this.length; i++) {
                this[i].n$insert(name, obj);
            }
            return this;
        };


    /////////////////////////////////////////////////////////////////
    ////////////////////// Public Members ///////////////////////////

    /**
     * Defines and returns namespace object.
     * @param {string} ns
     * @param {n$} scope
     */
    cnt.n$ = function (ns, scope) {
        var parent = new n$(scope || window);
        if (ns != null) {
            if (typeof(ns) == typeof([]) && ns.length != 0) {
                var nsArray = [];
                for (var item in ns) {
                    nsArray.push(cnt.n$(ns[item], scope));
                }
                return new n$array(nsArray);
            } else if (typeof(ns) == typeof("") && ns.trim() != "") {
                var parts = ns.split('.');
                for (var key in parts) {
                    var part = parts[key];
                    parent = parent[part] = new n$(parent[part]);
                }
            }
        }
        return parent;
    };

    /////////////////////////////////////////////////////////////////

})(window);