// Author: Rose Wisotzky
// This component holds our form for adding a new task. Very cool.
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
    // Over here we are making our new task object! How cool! We're making sure the user can't refresh with preventDefault. We're also sneaking into sessionStorage and grabbing our user's ID to be able to assign that task to them. 
    constructNewTask = (event) => {
            event.preventDefault()
            const newTask = {
            task: this.state.task,
            isComplete: "",
            userId: parseInt(sessionStorage.getItem("userID"))
        }
        this.props
        // Over here we're posting our new task to the route that ends with /tasks.
        .addTask(newTask)
        .then(()=>this.props.history.push("/tasks"))
    }
    // Let's render this! Render lets us build out our JSX that will be displayed on the DOM. What we're rendering here is our form that a user may utilize to add a new task to their list.
    render () {
        return (
            <React.Fragment>
                {/* This lil section says that when we click our button with the type of submit we are creating our new task object */}
                <form onSubmit={this.constructNewTask} className="taskForm">
                    <div className="task-div">
                        <label htmlFor="task">Task: </label>
                        <input
                        type="text"
                        required
                        className="taskFormInput"
                        // Whenever there is a change in our input, onChange will call handleFieldChange which is located above, if you'd care to read more about that.
                        onChange={this.handleFieldChange}
                        id="task"
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