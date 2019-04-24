import React, {Component} from 'react'
import TaskManager from '../../modules/TaskManager'

export default class TaskEditForm extends Component {
    state = {
        task: "",
        isComplete: "",
        userId: ""
    };
    // handleFieldChange is a method that sets state to the whatever the value of the input field is.
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    // Over here we are updating our edited task object! How cool! We're making sure the user can't refresh with preventDefault. We're also sneaking into sessionStorage and grabbing our user's ID to be able to assign that task to them. 
    UpdateExisitingTask = (event) => {
            event.preventDefault()
            const editedTask = {
            id: Number(this.props.match.params.taskId),
            task: this.state.task,
            isComplete: "",
            userId: parseInt(sessionStorage.getItem("userID"))
        }
        this.props.updateTask(editedTask)
        // Over here we're posting our 
        .then(()=>this.props.history.push("/tasks"))
    }
    componentDidMount() {
        TaskManager.get(this.props.match.params.taskId)
        .then(task => {
            console.log(task)
            this.setState({
                task: task.task,
                isComplete: "",
                userId: task.userId
            })
            
        })
    }
    render () {
        return (
            <React.Fragment>
                <form onSubmit={this.UpdateExisitingTask} className="taskForm">
                    <div className="task-div">
                        <label htmlFor="task">Task: </label>
                        <input
                        type="text"
                        required
                        className="taskFormInput"
                        onChange={this.handleFieldChange}
                        id="task"
                        value={this.state.task}
                        placeholder="Task Name"></input>
                    </div>
                <button
                type="submit"
                onClick={this.UpdateExisitingTask}
                className="btn btn-primary">
            Update
                </button>
                </form>
            </React.Fragment>
        )
    }
}