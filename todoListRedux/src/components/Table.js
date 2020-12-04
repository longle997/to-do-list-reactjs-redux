import React, { Component } from 'react';
import {connect} from 'react-redux';
import TaskItems from './TaskItems'
import * as action from '../Actions/index';

class Table extends Component {

    constructor(props){
        super(props);
        this.state = ({
            filterName: '',
            filterStatus: -1
        });
    }

    /*
    will be called if user click and choose option from sort status dropdown menu
    passing sort name and sort status to reducer
    */
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
        /*
            loop throught all element in array and at every element passing it's data to TaskItems component
        */
        var elementTasks = tasks.map((task, index) => {
            return <TaskItems 
                        key={task.id} 
                        index={index} 
                        task={task}
                        
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

/*
    store is a box, contain all states and we not able to know location of the store
    mapStatetoProps in order to take what we want from the store and things we took becomes props of this component
    connect in order to find the store
*/
const mapStateToProps = (state) => {
    return {
        //tasks is now become props of this component and we can use it to display data
        tasks: state.listAll
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // now we can call onFilter function in this component as a props
        onFilter : (filterName, filterStatus) => {
            dispatch(action.FilterTask(filterName, filterStatus))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
