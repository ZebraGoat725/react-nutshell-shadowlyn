import React, {Component} from 'react'

export default class TaskForm extends Component {
    state = {
        task: " ",
        isComplete: " ",
        userId: " "
    };
    // handleFieldChange is a method that sets state to the whatever the value of the input field is.
    handleFieldChange = task => {
        const stateToChange = {}
        stateToChange[task.target.id] = task.target.value
        this.setState(stateToChange)
    }
    constructNewTask = task => {
        const newTask = {
            name: this.task.task
        }
    }
    render () {
        return (
            <React.Fragment>
                <form className="taskForm">
                <div className="task-div">
                <label htmlFor="taskName">Task: </label>
                <input
                type="text"
                required
                className="taskFormInput"
                onChange={this.handleFieldChange}
                id="taskName"
                placeholder="Task Name"></input>
                </div>
                </form>
            </React.Fragment>
        )
    }
}