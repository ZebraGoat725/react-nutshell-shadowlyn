// Author: Rose Wisotzky
// This component holds the form that edits the task.
import React, {Component} from 'react'
import TaskManager from '../../modules/TaskManager'

export default class TaskEditForm extends Component {
    // Here we are setting the state as blank so we can change it in our update functions.
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
    // Over here we are updating our edited task object! Even cooler than making a new object, in my humble opinion! We're making sure the user can't refresh with preventDefault. We're also sneaking into sessionStorage and grabbing our user's ID to be able to assign that task to them. Since we're using a PUT, we are also listing the id of the object itself. This way, our PUT knows exactly which task we are trying to edit.
    UpdateExisitingTask = (event) => {
            event.preventDefault()
            const editedTask = {
            id: Number(this.props.match.params.taskId),
            task: this.state.task,
            isComplete: "",
            userId: parseInt(sessionStorage.getItem("userID"))
        }
        this.props.updateTask(editedTask)
        // Over here we are changing our route to the path that the task component lives in. The task component is rendered with the updated state, letting us see our freshly updated task.
        .then(()=>this.props.history.push("/tasks"))
    }
    // Since we're pre-filling our input fields with data that already exists in our database, we can call componentDidMount and make that GET call in this component. It's not adding a new object, so it's totally chill to do that here. componentDidMount runs after our render and updates our state, as componentDidMount does.
    componentDidMount() {
        TaskManager.get(this.props.match.params.taskId)
        .then(task => {
            this.setState({
                task: task.task,
                isComplete: "",
                userId: task.userId
            })
            
        })
    }
    // We've gone over render before, so for the sake of my fingers, I recommend you cruise over to TaskForm.js to read all about it.
    render () {
        return (
            <React.Fragment>
                {/* Again, clicking our button with the type submit calls our function to update an existing task */}
                <form onSubmit={this.UpdateExisitingTask} className="taskForm">
                    <div className="task-div">
                        <label htmlFor="task">Task: </label>
                        <input
                        type="text"
                        required
                        className="taskFormInput"
                        onChange={this.handleFieldChange}
                        id="task"
                        // Setting our value as this.state.task prefills us in that input field. Wow! Rad! Tubular!
                        value={this.state.task}
                        placeholder="Task Name"></input>
                    </div>
                <button
                type="submit"
                className="btn btn-primary">
            Update
                </button>
                </form>
            </React.Fragment>
        )
    }
}