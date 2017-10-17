var App = {
    define: _define
};

function _define(namespace) {
    var parts = namespace.split('.');
    var parent = App;

    if (parts[0] === 'App') {
        parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (typeof parent[part] === 'undefined') {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
}

module.exports = App;