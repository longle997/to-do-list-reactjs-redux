import React, { Component } from 'react';

class TaskHandler extends Component {

    //by this way, we can transfer this event to parent of TaskHandler => App
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

    //this function is used to catch a submit event in form
    onHandleSubmit = (event) =>{
        event.preventDefault();
        this.props.onHandleSubmit(this.state);
        this.onHandleClear();
        this.onCloseForm();
    }

    onHandleClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

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

export default TaskHandler;