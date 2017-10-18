let App = require('../App');

let presentationalLayer = App.define('App.presentationalLayer');

presentationalLayer.TaskController = class TaskController {

    constructor(task, $template) {
        this.task = task;
        this.$template = $template;
        this.appService = new App.businessLayer.AppService();
        this.taskService = new App.businessLayer.TaskService();

        this.$template.attr('id', 'task_' + task.id);
        this.$template.find('.task-list__task-title').text(task.title);
        this.$template.find('.task-list__task-deadline').text(task.deadline);
        this.setPriority(this.$template, this.task.priority);
        this.$template.addClass(task.status ? 'task-list__task--done' : 'task-list__task--undone');
        this.$template.find('.task-list__task-status').prop('checked', task.status);

        this.$template.on('click', '.task-list__task-delete', this.removeTask.bind(this));
        this.$template.find('.task-list__priority-list-item').on('click', this.priorityChanged.bind(this));
        this.$template.find('.task-list__task-status').on('click', this.statusChanged.bind(this));
    }

    getElement() {
        return this.$template;
    }

    removeTask(event) {
        this.appService.taskListController.removeTask(this.task);
    }

    priorityChanged(event) {
        let $a = $(event.target);
        if (!$a.is('a')) {
            $a = $a.closest('a');
        }

        this.task.priority = $a.data('priority');

        let self = this;
        this.taskService.updateTask(this.task).then(() => {
            self.setPriority($a.closest('.task-list__task'), self.task.priority);
        });
    }

    statusChanged(event) {
        let $status = $(event.target);

        this.task.status = $status.prop('checked');

        $status.toggleClass('disabled');
        this.appService.taskListController.changeTaskStatus(this.task).then(
            () => {
                $status.toggleClass('disabled');
            }
        );
    }

    getBgClass(priority) {
        switch (priority) {
            case 'urgent':
                return 'text-danger';
            case 'high':
                return 'text-warning';
            case 'low':
                return 'text-info';
            default:
                return 'text-primary';
        }
    }

    setPriority($element, priority) {
        let $priority = $element.find('.task-list__task-priority');
        $priority.removeClass('text-danger text-warning text-primary text-info').addClass(this.getBgClass(priority));
    }

};