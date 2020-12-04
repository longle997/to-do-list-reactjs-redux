import React, { Component } from 'react';
import '../App.css'
import {connect} from 'react-redux';
import * as actions from './../Actions/index';

class TaskItems extends Component {

    /*
        called when user click on status circle
        passing id of which task was clicked
    */
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    /*
        called when user click on delete button
        passing id of which task was clicked
    */
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    /*
    purpose of onModify is pass this.props.task, which is props from Table.js to reducer
    We have to call onOpenForm because when switch from Add to Modify task
    we want edit window still open
    reducer for onModify action is in reducers/ModifyTask.js
    */
    onModify = () => {
        this.props.onModify(this.props.task);
        this.props.onOpenForm();
    }

    render(){
        var {task, index} = this.props;
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td>{task.name}</td>
                <td className="align">
                    <span 
                        className={task.status === true ? "edit-check-icon-checked" : "edit-check-icon-uncheck"}
                        onClick={this.onUpdateStatus}
                    > { task.status === true ? <i className="fas fa-check-circle"></i> :  <i className="far fa-circle"></i> } </span>
                </td>
                <td>
                    <div className="align">
                        <button type="button" className="btn btn-success" onClick={this.onModify} >Chỉnh sửa <i className="fas fa-edit"></i> </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>Xóa <i className="far fa-trash-alt"></i> </button>
                    </div>
                </td>
            </tr>         
        );
    }
}

/*collect state from store and pass to App component as a prop
so app component can use isDisplayForm as a prop
*/
const mapStatetoProps = (state) => {
    return {
        
    };
};

/*need to map Dispatch function as a prop to App component
so App component can use dispatch function to dispatch action to reducer
*/
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.UpdateStatusTask(id))
        },
        onModify : (task) => {
            dispatch(actions.ModifyTask(task))
        },
        onOpenForm : () => {
            dispatch(actions.OpenForm())
        },
        onDelete : (id) => {
            dispatch(actions.DeleteTask(id))
        }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TaskItems);