import React, { Component } from 'react';
import * as action from './../Actions/index';
import {connect} from 'react-redux';

class TaskHandler extends Component {

    //by this way, we can transfer this event to reducer
    onCloseForm = () => {
        this.props.onExitForm();
    }

    constructor(props){
        super(props);
        this.state = {
            name: '',
            status: false,
            id: ''
        };
    }

    //this function is use for asign value was in input -> state of this component
    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        /*because status was passed with string type, but we wanna working with boolean type
          so we need to transfer it to boolean before asign to state */
        if(name==='status'){
            value = value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    /*
    this function is used to catch a submit or event in form
    after we enter value to name and choose status task => we click submit button in edit window
    */
    onHandleSubmit = (event) =>{
        event.preventDefault();
        var {taskEditing} = this.props;
        /*
        in the older version we have to pass this.state(an object with 3 elements)
        to App.js in order to change localStorage (place to store all states)
        this.props.onHandleSubmit(this.state);

        in new version we pass this.state to reducer in order to change state in 
        store(initialState or localStorage)
    
        in command this.props.onUpdateTask(this.state);
        this.state is the final result after we modify task with Add button or Modify button
        */
        if(taskEditing){
            this.props.onUpdateTask(this.state);
            this.props.onModify(null);
        }else{
            this.props.onAddTask(this.state);    
        }
        this.onHandleClear();
        this.onCloseForm();
    }

    /*
    be called when user click cancel button
    asign name and status value to default
    */
    onHandleClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    //component will mount is for the first time we open edit window
    componentWillMount(){
        if(this.props.taskEditing){
            this.setState({
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
                id: this.props.taskEditing.id,
            });
        }
    }

    // Component Will Receive Props mean every time you receive a new props, this function will run
    componentWillReceiveProps(NextProps){
        /*  this case mean we receive a new props and taskEditing is precent
            this mean change status from Add -> Change
            Then we will asign this state to make TaskHandler window show name and status of work we need to update
        */
        if(NextProps && NextProps.taskEditing){
            this.setState({
                name: NextProps.taskEditing.name,
                status: NextProps.taskEditing.status,
                id: NextProps.taskEditing.id,
            });
        }else{
            this.setState({
                name: '',
                status: false,
                id: ''
            });
        }
    }

    render(){
        var {isDisplayForm, taskEditing} = this.props;
        if (isDisplayForm === false) return ""
        return (
            <div className="panel panel-info">
                <div className="panel-heading flexBox-container flex-spaceBetween">
                <h3 className="panel-title" >{ this.state.id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }</h3>
                <button onClick={this.onCloseForm} >X</button>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                    <label>Tên: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.onHandleChange}
                    />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái: </label>
                        <select 
                            name="" 
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                        >
                            <option value={false}>Cần làm</option>
                            <option value={true}>Đã làm</option>
                        </select>
                    </div>
                    <div className="align">
                        <button type="submit" className="btn btn-success">Lưu lại</button>&nbsp;
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onHandleClear}
                        >Hủy bỏ</button>
                    </div>
                </form>
            </div>
            </div>            
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        /*
        We don't want App.js control open/close edit window anymore so we use isDisplayForm here
        taskEditing is transfer from TaskItems -> reducer -> store -> to here
        contain task that we are editing right now
        */
        isDisplayForm : state.isDisplayForm,
        taskEditing: state.taskEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    /*to return an object has one element is onAddTask function
    and this function will call dispatch
    in order to dispatch an action to reducer*/
    return {
        onAddTask : (task) => {
            dispatch(action.AddItem(task));
        },
        onExitForm : () => {
            dispatch(action.CloseForm());
        },
        onModify : (task) => {
            dispatch(action.ModifyTask(task))
        },
        onUpdateTask : (task) => {
            dispatch(action.UpdateTask(task))
        }
    }
};

//connect function will pass return of mapStateToProps,mapDispatchToProps to TaskHandler as props
export default connect(mapStatetoProps,mapDispatchToProps)(TaskHandler);