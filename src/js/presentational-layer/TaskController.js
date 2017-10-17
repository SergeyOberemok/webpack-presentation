(function (App) {
    'use strict';

    var presentationalLayer = App.define('App.presentationalLayer');

    var TaskController = function (task, $template) {
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
    };

    TaskController.prototype.getElement = function () {
        return this.$template;
    };

    TaskController.prototype.removeTask = function (event) {
        this.appService.taskListController.removeTask(this.task);
    };

    TaskController.prototype.priorityChanged = function (event) {
        var $a = $(event.target);
        if (!$a.is('a')) {
            $a = $a.closest('a');
        }

        this.task.priority = $a.data('priority');

        var self = this;
        this.taskService.updateTask(this.task).then(function () {
            self.setPriority($a.closest('.task-list__task'), self.task.priority);
        });
    };

    TaskController.prototype.statusChanged = function (event) {
        var $status = $(event.target);

        this.task.status = $status.prop('checked');

        $status.toggleClass('disabled');
        this.appService.taskListController.changeTaskStatus(this.task).then(
            function () {
                $status.toggleClass('disabled');
            }
        );
    };

    TaskController.prototype.getBgClass = function (priority) {
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
    };

    TaskController.prototype.setPriority = function ($element, priority) {
        var $priority = $element.find('.task-list__task-priority');
        $priority.removeClass('text-danger text-warning text-primary text-info').addClass(this.getBgClass(priority));
    };

    presentationalLayer.TaskController = TaskController;

})(App);