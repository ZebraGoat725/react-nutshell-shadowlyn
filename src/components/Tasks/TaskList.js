import React, {Component} from 'react'

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
                    <div className="card-body">
                        <h5 className="card-title">
                        Task: </h5>
                        {task.task}
                    </div>
                </div>
                )
                }
                </section>
            </React.Fragment>
            
        )
    }
}