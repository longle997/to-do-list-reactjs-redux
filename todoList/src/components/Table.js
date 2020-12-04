import React, { Component } from 'react';
import TaskItems from './TaskItems'

class Table extends Component {

    constructor(props){
        super(props);
        this.state = ({
            filterName: '',
            filterStatus: -1
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName, 
            name === 'filterStatus' ? value : this.state.filterStatus
        );
    }

    render(){
        var {tasks} = this.props;
        var elementTasks = tasks.map((task, index) => {
            return <TaskItems 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onUpdateStatus={this.props.onUpdateStatus}
                        onDelete={this.props.onDelete}
                        onModify={this.props.onModify}
                    />
        });
        return (
            <div className="row mt-30">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col" >STT</th>
                                <th scope="col" >Tên</th>
                                <th scope="col" >Trạng thái</th>
                                <th scope="col" >Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <input 
                                        type="text" 
                                        name="filterName" 
                                        className="form-control" 
                                        value={this.state.filterName}
                                        onChange={this.onChange}
                                    />
                                </td>
                                <td>
                                    <select 
                                        name="filterStatus" 
                                        className="form-control" 
                                        value={this.state.filterStatus}
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>Tất cả</option>
                                        <option value={0}>Đã làm</option>
                                        <option value={1}>Cần làm</option>
                                    </select>
                                </td>
                                <td> </td>
                            </tr>
                            {elementTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;
