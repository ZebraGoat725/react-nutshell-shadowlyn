// Author: Rose Wisotzky
// This component holds our JSX that splashes our list of tasks to do onto our DOM. A crucial and mighty yet humble component.
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class TaskList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="newTask">
                {/* Whoa, what's that? You want to add a new task? Click this button then hop on over to TaskForm.js to see all the magic behind the button */}
                <button type="button"
                    className="taskButton"
                    // We're just saying over here "hey, when this button is clicked, let's go over to the route that ends in /tasks/new"
                    onClick = {() => {
                        this.props.history.push("/tasks/new")
                    } }> Add New Task    </button>
                </div>
                <section className="content">
                {/* Here's that list I mentioned earlier. We're mapping through our tasks and for each one building out a card that shows the name of the task. We also did a rad thing where we wrapped that task name in a handy little link that will route us to the edit section. That's in the bottom of ApplicationViews. Like with our button above, slide over to TaskEditForm.js to change your tasks. */}
                {
                this.props.tasks.map(task =>  
                <div key ={task.id} className="card">
                    <Link className="edit-link" to={`tasks/${task.id}/edit`}>{task.task}</Link>
                </div>
                )
                }
                </section>
            </React.Fragment>
            
        )
    }
}