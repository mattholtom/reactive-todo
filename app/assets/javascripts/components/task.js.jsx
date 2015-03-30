var Task = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    completed: React.PropTypes.bool
  },

  handleCompletion: function() {
        this.props.completed = !this.props.completed;
        TaskActions.updateTask(this.props)
  },

  handleDeletion: function() {
    TaskActions.deleteTask(this.props.id);
  },

  render: function() {
    return (
      <li>{this.props.name} , <button onClick={this.handleDeletion}>Delete</button>
        <input type="checkbox"
          checked={this.props.completed}
          ref="completedInput"
          onChange={this.handleCompletion} />
      </li>
    );
  }
});
