var NewTaskForm = React.createClass({
  getInitialState: function() {
                     return {
                       taskName: ''
                     }
                   },
  handleSubmit: function(e) {
        e.preventDefault();
        TaskActions.addTask({name: this.state.taskName, completed: false})
        this.setState({taskName: ''});
                },
  handleChange: function(e) {
        this.setState({taskName: this.refs.taskNameInput.getDOMNode().value});
                },
  render: function() {
            return (
                <form onSubmit={this.handleSubmit}>
                  <input type="text"
                         ref="taskNameInput"
                         onChange={this.handleChange}
                         value={this.state.taskName} />
                  <input type="submit" value="Go" />
                </form>
              );
          }
});
