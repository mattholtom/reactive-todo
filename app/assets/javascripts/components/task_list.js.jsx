var TaskList = React.createClass({

  propTypes: {
    source: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      tasks: []
    }
  },

  handleUserInput: function(task) {
    this._toggleTask(task.props.id, task.refs.completedInput.getDOMNode().checked);
  },

  handleNewTask: function(newTaskName) {
    this._addNewTask(newTaskName);
  },

  _addNewTask: function(taskName) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "/tasks",
      data: {task: {name: taskName}},
      dataType: "json"
    }).done(function(task) {
      newTasks = self.state.tasks.concat(task);
      self.setState({tasks: newTasks});
    });
  },

  _toggleTask: function(taskId, completedStatus) {
    var self = this;
    var url = '/tasks/' + taskId + '.json';
    $.ajax({
      type: "POST",
      url: url,
      data: { _method: 'PUT', task: {completed: completedStatus}},
        dataType: 'json'
      }).done(function (serverTask) {
        newTasks = _.map(self.state.tasks, function(task) {
          if (task.id === taskId) {
              return serverTask;
          } else {
            return task;
          }
        });
        self.setState({
          tasks: newTasks
        });
      });
    },

    componentDidMount: function() {
      $.get(this.props.source, function(result) {
        if (this.isMounted()) {
          this.setState({
            tasks: result
          });
        }
      }.bind(this));
    },

    render: function() {
      var self = this;
      var tasks = this.state.tasks.map(function(task) {
        return <Task
          key={task.id}
          id={task.id}
          name={task.name}
          completed={task.completed}
          onUserInput={self.handleUserInput} />
      });
      return (
        <div>
          <ul>
            <p>Task Name, Completed?</p>
            {tasks}
          </ul>
          <NewTaskForm onUserInput={self.handleNewTask} />
        </div>
      );
    }
  });
