import React, {Component} from 'react'


export default class TaskForm extends Component {
    state = {
        task: " ",
        isComplete: " ",
        userId: " "
    };
    // handleFieldChange is a method that sets state to the whatever the value of the input field is.
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    constructNewTask = (event) => {
            event.preventDefault()
            const newTask = {
            task: this.state.task,
            isComplete: "",
            userId: parseInt(this.state.userId)
        }
        this.props
        .addTask(newTask)
        .then(()=>this.props.history.push("/tasks"))
    }
    render () {
        console.log(this.state.task)
        return (
            <React.Fragment>
                <form onSubmit={this.constructNewTask} className="taskForm">
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
                className="btn btn-primary">
            Submit
                </button>
                </form>
            </React.Fragment>
        )
    }
}