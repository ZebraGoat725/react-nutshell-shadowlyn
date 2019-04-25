// Author: Rose Wisotzky
// This component holds our JSX that splashes our list of tasks to do onto our DOM. A crucial and mighty yet humble component.
import React, {Component} from 'react'
import { Link } from 'react-router-dom'


export default class TaskList extends Component {
    // This method creates the completed object and sets the isComplete value from false to true.
    taskComplete(taskId) {
        const object = {
            id: taskId,
            isComplete: true,
            userId: parseInt(sessionStorage.getItem("userID"))
        }
        // Here we're calling patchTask to update only the isComplete key value. Sick! How convenient!
        this.props.patchTask(object)
    }

    render () {
        console.log(this.props.tasks)
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
                {/* Our handy dandy link to the task edit */}
                    <label>Hey buddy, you should TOTALLY <Link className="edit-link" to={`tasks/${task.id}/edit`}>{task.task}</Link> </label>
                    {/* Oh wow, look at that, a task that you ACTUALLY completed (it's about time). Here's a cool checkbox that when you click it calls the taskComplete. If you're just skimming this buddy, go scroll on up to the top of this component and refresh your memory. */}
                    <label>Wait, you already did that? Check this box my guy <input type="checkbox"
                    onClick = {() => {
                        this.taskComplete(task.id)
                    }}
                    ></input></label>
                </div>
                )
                }
                </section>
            </React.Fragment>
            
        ) 
    }
}