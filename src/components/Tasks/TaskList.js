import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class TaskList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="newTask">
                <button type="button"
                    className="taskButton"
                    onClick = {() => {
                        this.props.history.push("/tasks/new")
                    } }> Add New Task    </button>
                </div>
                <section className="content">
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