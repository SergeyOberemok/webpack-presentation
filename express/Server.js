let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let ToDoListController = require('./controllers/ToDoListController');


module.exports = class Server {
    constructor (port) {
        this.app = express();
        this.setDefaultConfiguration(port, [
            {url: '/', path: '../dist'},
            {url: '/src', path: '../src'}
        ]);

        this.app.get('/', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../dist/index.html'));
        });

        new ToDoListController(this.app);

        this.setDefaultResponses();
    }

    setDefaultConfiguration (port, folderList) {
        this.app.set('port', port || 3000);
        this.app.use(bodyParser.json());

        let self = this;
        folderList.forEach(function(item) {
            self.app.use(item.url, express.static(path.resolve(__dirname, item.path)));
        });
    }

    setDefaultResponses () {
        this.set404NotFoundError();
        this.set500Error();
    }

    set404NotFoundError () {
        this.app.use(function (req, res) {
            res.type('text/plain');
            res.status(404);
            res.send('404');
        });
    }

    set500Error () {
        this.app.use(function (err, req, res) {
            console.log(err.stack);
            res.type('text/plain');
            res.status(500);
            res.send('500');
        });
    }

    start () {
        this.app.listen(this.app.get('port'), function () {
            console.log('Server is running');
        });
    }

};