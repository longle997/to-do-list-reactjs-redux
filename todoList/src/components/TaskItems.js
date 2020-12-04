import React, { Component } from 'react';
import '../App.css'

class Table extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onModify = () => {
        this.props.onModify(this.props.task.id);
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
                    > { task.status === true ? <i class="fas fa-check-circle"></i> :  <i class="far fa-circle"></i> } </span>
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

export default Table;
