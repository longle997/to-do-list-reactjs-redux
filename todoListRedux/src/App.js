import React, { Component } from 'react';
import TaskHandler from './components/TaskHandler'
import Control from './components/Control'
import Table from './components/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import {connect} from 'react-redux';
import * as actions from './Actions/index';

class App extends Component {

    constructor(props) {
            super(props);
            this.state = {
            tasks: [],
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            sortName: '',
            sortStatus: 1,
            searchName: ''
        };
    }
    /*
    onToggleForm function now act as a prop of App component so we can call it by this syntax
    main purpose is dispatch action to reducer in './reducers/isDisplayForm'
    onModify action was called to pass null to ModifyTask.js in order to set
    taskEditing to null, that make edit window with empty value when we click "thêm công việc"
    */
    onDisplayForm = () => {
        var {taskEditing} = this.props;
        if(taskEditing){
            this.props.onShowForm();
            this.props.onModify(null);
        }else{
            this.props.onToggleForm();
            this.props.onModify(null);
        }
    }

    render(){

        var {isDisplayForm} = this.props;                                          
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="align" >Todo list <i className="fas fa-tasks"></i></h1>
                        <hr/>
                    </div>
                    {/*TASK handler*/}
                    <div className="row">
                        <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : " "}>
                            <TaskHandler />
                        </div>
                       {/*Control*/}
                        <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
                            <button type="button" className="btn btn-primary add-icon" onClick={this.onDisplayForm} >Thêm công việc </button>&nbsp;
                            {/*<button type="button" className="btn btn-primary" onClick={ this.onGenerateData } >Generate infor</button>*/}
                            <br/>
                            {/*Control*/}
                            <Control/>
                            {/*data table, we pass this.state.tasks into this component for display data*/}
                            <Table/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*collect state from store and pass to App component as a prop
so app component can use isDisplayForm as a prop
*/
const mapStatetoProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        taskEditing: state.taskEditing
    };
};

/*need to map Dispatch function as a prop to App component
so App component can use dispatch function to dispatch action to reducer
*/
const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.ToggleForm())
        },
        onCloseForm : () => {
            dispatch(actions.CloseForm())
        },
        onShowForm : () => {
            dispatch(actions.OpenForm())
        },
        onModify : (task) => {
            dispatch(actions.ModifyTask(task))
        },
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
