import React, { Component } from 'react';
import TaskHandler from './components/TaskHandler'
import Control from './components/Control'
import Table from './components/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {

    // onGenerateData = () => {
    //     var tasks = [
    //         {
    //             // using generateID function to gen a random ID
    //             id: this.generateID() ,
    //             name: 'Học reactjs',
    //             status: true
    //         },
    //         {
    //             id: this.generateID() ,
    //             name: 'coi Lâmvlog',
    //             status: false
    //         },
    //         {
    //             id: this.generateID() ,
    //             name: 'Đi ị',
    //             status: true
    //         },
    //     ];
    //     console.log(tasks);
    //     /*
    //     Can not use this way, because whenever the page was refresh, state will lose data => have to use local strorage or session storage
    //     this.setState({
    //         tasks: tasks
    //     });
    //     */
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    /*
    taskEditing is used to store an element that we wanna modify
    */
    constructor(props) {
            super(props);
            this.state = {
            tasks: [],
            isDisplayForm: false,
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

    //this is call life cycle and it was call only 1 time at the begining
    componentWillMount() {
        //check localStorage is TRUE && it already get an item name 'tasks'
        if(localStorage && localStorage.getItem('tasks')){
            //parse 
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    // this function return a random string
    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    // this function is concatnate random string to a long string
    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onDisplayForm = () => {
        /*
            isDisplayForm === true && taskEditing is precent mean that the TaskHandler window is opening
            in other word is change status from Update -> Add
        */
        if(this.state.isDisplayForm === true && this.state.taskEditing)
        {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        }else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });    
        }
        
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    //now we can recerving data from TaskHandler, which are name and status of new task
    onHandleSubmit = (data) => {
        // var tasks = this.state.tasks; this command will assign value of this.state.tasks to tasks var
        var {tasks} = this.state;

        // this is wrong because tasks var now is an array and have 3 elements
        // tasks = {
        //     id: this.generateID(),
        //     name: data.name,
        //     status: data.status
        // };

        if(data.id !== ''){
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }else{
            data.id = this.generateID();
            tasks.push(data);
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        });

        //without local storage state will be lost when we refresh the page
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        /*
            when we have index of element we wanna change, we can change it's status
            to be able to use local storage and easy to asign an array, we use a var have the same type with this.state.tasks
            manipulate that var and asign it to this.state.tasks
        */
        var index = this.findIndex(id);
        var {tasks} = this.state;

        tasks[index].status = !this.state.tasks[index].status;

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findIndex = (id) => {
        /*  loop through all element in this.state.tasks and compare with it's id
            if input parameter and id in tasks is the same, return it's index
        */
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        /*
            when we have index of element we wanna delete, we can delete it
            to be able to use local storage and easy to asign an array, we use a var have the same type with this.state.tasks
            manipulate that var and asign it to this.state.tasks
        */
        var index = this.findIndex(id);
        var {tasks} = this.state;

        tasks.splice(index,1);

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onModify = (id) => {
        // this.onDisplayForm();
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        // console.log(taskEditing);
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus
            }
        });
    }

    onSort = (sortName, sortStatus) => {
        this.setState({
            sortName: sortName,
            sortStatus: sortStatus
        });
    }

    onSearch = (searchName) => {
        this.setState({
            searchName: searchName
        });
    }

    render(){
        // equal to var tasks = this.state.tasks
        var {tasks, isDisplayForm, filter, sortName, sortStatus, searchName} = this.state;

        //check is filter is present
        if(filter){
            //check is filter.name is present
            if(filter.name){
                /*
                    loop through all element in tasks array
                    at each element (task), check is the character received from filter.name present in task.name string
                    for example: task.name = học react js
                                 filter.name = học
                                 return true
                    after return true, that element will be saved in new array, because filter method not change the original array
                    that why we have to asign new array to original array (tasks = tasks.filter)
                */
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                });
            }

            /*
                the reason why we don't check if(filter.status) here
                because it will check !== null && !== undefined && !==0
                so the case filter.status = 0 (đã làm) will be ignore
            */

            /*
                loop through all element in tasks array
                at each element of tasks array
                check is filter.status (status that we selected from table, status that we wanna filter)
                then check is task.status (element in tasks array) to decide will we need to save this element
                for example: we wanna filter "đã làm" status
                    first we need to check filter status = 0 (we decided this value)
                    after that we check is task.status (current element) is true(đã làm), then return it (save this element to new array)
            */
            tasks = tasks.filter((task) => {
                if(filter.status === 0){
                    return task.status === true ? true : false;
                }else if(filter.status === 1){
                    return task.status === false ? true : false;
                }else{
                    return true;
                }
            });
        }

        //if sortName is present, mean !==null && !==undefined
        if(sortName === 'name'){
            tasks.sort((a,b) => {
                /*
                    from a-z if a is greater than b, swap them and opposite
                    if return positive, swap 2 element and opposite
                    a.name mean we using name state to sort
                */
                if(a.name > b.name){
                    return sortStatus;
                }else if(a.name < b.name){
                    return -sortStatus;
                }else{
                    return 0;
                }
            });
        }

        if(sortName === 'status'){
            tasks.sort((a,b) => {
                /*
                    from a-z if a is greater than b, swap them and opposite
                    if return positive, swap 2 element and opposite
                    a.name mean we using status state to sort
                */
                if(a.status > b.status){
                    return -sortStatus;
                }else if(a.status < b.status){
                    return sortStatus;
                }else{
                    return 0;
                }
            });
        }

        if(searchName){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
            });
        }

        //if don't do this, <TaskHandler/> will still exist, onExitForm is event that tansfer from child to parent
        var elementForm = isDisplayForm === true ? <TaskHandler 
                                                        onHandleSubmit={this.onHandleSubmit}  
                                                        onExitForm={this.onCloseForm} 
                                                        taskEditing={this.state.taskEditing}
                                                    /> : '';                                            
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
                            {elementForm}
                        </div>
                       {/*Control*/}
                        <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
                            <button type="button" className="btn btn-primary add-icon" onClick={this.onDisplayForm} >Thêm công việc </button>&nbsp;
                            {/*<button type="button" className="btn btn-primary" onClick={ this.onGenerateData } >Generate infor</button>*/}
                            <br/>
                            {/*Control*/}
                            <Control
                                onSortControl={ this.onSort }
                                onSearch ={this.onSearch}
                            />
                            {/*data table, we pass this.state.tasks into this component for display data*/}
                            <Table 
                                tasks={tasks} 
                                onUpdateStatus={this.onUpdateStatus} 
                                onDelete={this.onDelete} 
                                onModify={this.onModify} 
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
