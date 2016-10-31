var React = require('react');
var actions = require('../../redux/actions/TaskCategory');
var connect = require('react-redux').connect;
var CardList = require('./CardList');

var CategoryDisplay = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },
  handleAddCategory: function(data, event) {
    event.preventDefault();
    var taskId = data._id;
    var val = this.refs['card-add-' + taskId].value
    var TaskConstruct = {
      owner: data.owner,
      title: val,
      category: data.title,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'active'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, taskId));
    // this.props.dispatch(actions.fetchUser());
    this.refs['card-add-' + taskId].value = "";
  },
  handleAddTask: function(data, event) {
    event.preventDefault();
    var taskId = data._id;
    var val = this.refs['card-add-' + taskId].value
    var TaskConstruct = {
      owner: data.owner,
      title: val,
      category: data.title,
      subtask: data.subtask,
      assignedTo: data.assignedTo,
      status: 'active'
    }
    this.props.dispatch(actions.postCard(TaskConstruct, taskId));
    // this.props.dispatch(actions.fetchUser());
    this.refs['card-add-' + taskId].value = "";
  },
 render: function(){
  var that = this;
  var handleAddTask = function(event){
    that.handleAddTask(this, event)
  };
  var handleAddCategory = function(event){
    that.handleAddTask(this, event)
  };
  //if(this.props.categories){
    var displayCategories = this.props.categories.map(function(data, index) {
     return (
        <div className="task-list-container" key={index}>
        <h1>{data.title}</h1>
            <CardList cardsData={data.cards} categoryId={data._id}/>
            <div className="input-task">

            <input  key={index} ref={'card-add-'+ data._id}  type='text' />
            <button type='submit' onClick={handleAddTask.bind(data)}>Add Task</button>
            </div>
        </div>
       )
   });
  // }

   return (
     <div className='task-categories'>
     {displayCategories}
     </div>
   )
 }
});



var mapStateToProps = function(state, props) {
	return {
    categories: state.cardList.task || [],
    // categoryId: state
    userId: state.cardList.userId
	}
};

var Container = connect(mapStateToProps)(CategoryDisplay);

module.exports = Container;
