var Task = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    completed: React.PropTypes.bool,
    onUserInput: React.PropTypes.func
  },

  handleClick: function() {
    this.props.onUserInput(this);
  },

  render: function() {
    return (
      <li>{this.props.name},
        <input type="checkbox"
          checked={this.props.completed}
          ref="completedInput"
          onChange={this.handleClick} />
      </li>
    );
  }
});
