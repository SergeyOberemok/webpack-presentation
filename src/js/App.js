let App = {
    define: _define
};

function _define(namespace) {
    let parts = namespace.split('.');
    let parent = App;

    if (parts[0] === 'App') {
        parts = parts.slice(1);
    }

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];

        if (typeof parent[part] === 'undefined') {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
}

module.exports = App;