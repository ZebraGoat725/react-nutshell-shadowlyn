import React, {Component} from 'react'


export default class TaskForm extends Component {
    state = {
        taskName: " ",
        // isComplete: " ",
        userId: " "
    };
    // handleFieldChange is a method that sets state to the whatever the value of the input field is.
    handleFieldChange = task => {
        const stateToChange = {}
        stateToChange[task.target.id] = task.target.value
        this.setState(stateToChange)
    }
    constructNewTask (newTask) {
            newTask = {
            task: this.state.task,
            // isComplete: parseInt(this.state.isComplete),
            userId: parseInt(this.state.userId)
        }
        this.props
        .addTask(newTask)
        .then(()=>this.props.history.push("/tasks"))
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
                <button
                type="submit"
                onClick={this.constructNewTask}
                className="btn btn-primary">
            Submit
          </button>
                </form>
            </React.Fragment>
        )
    }
}