var TaskActions = Reflux.createActions({
    "addTask": {children: ["completed"]},
    "deleteTask": {children: ["completed"]},
    "updateTask": {children: ["completed"]},
    "load": {children: ["completed"]}
});

TaskActions.addTask.listen(function (task) {
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: {task: task},
    dataType: "json"
  })
    .done(this.completed);
});

TaskActions.load.listen(function (task) {
  $.get('/tasks')
    .done(this.completed);
});

TaskActions.deleteTask.listen(function (taskId) {
  var url = "/tasks/" + taskId;
  $.ajax({
    type: "DELETE",
    url: url,
    dataType: "json"
  })
    .done(this.completed);
});

TaskActions.updateTask.listen(function (task) {
  var url = "/tasks/" + task.id;
  $.ajax({
    type: "PUT",
    url: url,
    data: {task: task},
    dataType: "json"
  })
    .done(this.completed);;
});

var TaskStore = Reflux.createStore({

  listenables: [TaskActions],

  getInitialState: function () {
                     this.tasks = [];
                     return this.tasks;
                   },

  onAddTaskCompleted: function(task) {
              this.tasks = this.tasks.concat(task);
              this.trigger(this.tasks);
            },

  onLoadCompleted: function(tasks) {
              this.tasks = tasks;
              this.trigger(this.tasks);
        },

  onDeleteTaskCompleted: function(deletedTaskId) {
              this.tasks = _.reject(this.tasks, function(task) {
                  return task.id === deletedTaskId;
              });
              this.trigger(this.tasks);
        },

  onUpdateTaskCompleted: function(updatedTask) {
      this.tasks = _.map(this.tasks, function(task) {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task
        }
      });
      this.trigger(this.tasks);
    }
});

var TaskList = React.createClass({
  mixins: [Reflux.connect(TaskStore, "tasks")],

  componentDidMount: function() {
    TaskActions.load();
  },

  render: function() {
              var self = this;
              var tasks = this.state.tasks.map(function(task) {
                return <Task
                key={task.id}
              id={task.id}
              name={task.name}
              completed={task.completed} />
              });
              return (
                  <div>
                  <ul>
                  <p>Task Name, Completed?</p>
                  {tasks}
                  </ul>
                  <NewTaskForm />
                  </div>
                  );
        }
});
