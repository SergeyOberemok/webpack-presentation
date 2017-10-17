module.exports = class ToDoListController {
    constructor(app) {
        this.app = app;

        this.increment = 0;

        this.toDoList = [
            {
                id: ++this.increment,
                title: 'first',
                description: '',
                deadline: '2017-12-12',
                priority: 'normal',
                status: false
            },
            {
                id: ++this.increment,
                title: 'second',
                description: '',
                deadline: '2017-11-12',
                priority: 'urgent',
                status: false
            },
            {
                id: ++this.increment,
                title: 'third',
                description: '',
                deadline: '2017-11-12',
                priority: 'high',
                status: false
            }
        ];

        let self = this;
        this.app.get('/to-do-list', (req, res) => {
            res.json(self.toDoList);
        });

        this.app.post('/to-do-list', (req, res) => {
            let task = {
                id: ++this.increment,
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.deadline,
                priority: req.body.priority,
                status: false
            };

            self.toDoList.push(task);

            res.json(task);
        });

        this.app.delete('/to-do-list/:id', (req, res) => {
            let index = null;
            for (let i = 0; i < self.toDoList.length; i++) {
                let item = self.toDoList[i];

                if (item.id == req.params.id) {
                    index = i;
                    break;
                }
            }

            if (index !== null) {
                self.toDoList.splice(index, 1);
                res.json({ id: Number(req.params.id), index: index });
            } else {
                res.status(404).send('Not found');
            }
        });

        this.app.put('/to-do-list/:id', (req, res) => {
            let found = false;
            for (let i = 0; i < self.toDoList.length; i++) {
                let item = self.toDoList[i];
                
                if (item.id == req.params.id) {
                    item.priority = req.body.priority;
                    item.title = req.body.title;
                    item.description = req.body.description;
                    item.deadline = req.body.deadline;
                    item.priority = req.body.priority;
                    item.status = req.body.status;

                    found = true;
                    break;
                }
            }

            if (found) {
                res.json({ id: Number(req.params.id) });
            } else {
                res.status(404).send('Not found');
            }
        });
    }
};