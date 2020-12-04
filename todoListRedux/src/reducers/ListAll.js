import * as types from './../constants/ActionTypes';

// this function return a random string
let s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

// this function is concatnate random string to a long string
let generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

let findIndex = (tasks, id) => {
    /*  loop through all element in this.state.tasks and compare with it's id
        if input parameter and id in tasks is the same, return it's index
    */
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
            result = index;
        }
    });
    return result;
}

/*get data from local storage
data from local storage is string
we convert it to object
*/
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.LIST_ALL:
			console.log("this case will never be coverage");
			return state;
		case types.ADD_ITEM:
			/*
			action now is an obj with 2 elements (type and task)
			task is an obj with 3 elements (name, status and id) what we passed from TaskHandler component
			we create a new object and assigned it value from task
			we push it into state array and set the new state to local storage
			finally we return a new state, [...state] is to avoid memory area reference of original state
			*/
			var newTask = {
				name: action.task.name,
				status: action.task.status,
				id: generateID()
			};
			state.push(newTask);
			//convert state to string and send it to local storage with name "tasks"
			localStorage.setItem('tasks',JSON.stringify(state));
			// create a new state and return it, not modify original state
			return [...state]
		case types.UPDATE_STATUS_TASK:
			/*
			    when we have index of element we wanna change, we can change it's status
	            to be able to use local storage and easy to asign an array, we use a var have the same type with this.state.tasks
	            manipulate that var and asign it to this.state.tasks
	        */
	        var index = findIndex(state, action.id);
	        /*
	        this action can't be perform because when you update only one property in object
	        that change can't perform in view immediately
	        to fix it you need to change whole object at the same time
	        var tempState = [...state];
	        tempState[index].status = !tempState[index].status;
	        state = tempState;
	        
	        create a new object with value of state[index], then change status property
			after that assign new object to old object
	        */
	        state[index] = {
	        	...state[index],
	        	status: !state[index].status
	        };
	        localStorage.setItem('tasks', JSON.stringify(state));
			return [...state]
		case types.UPDATE_TASK:
			/*
			find index of task was currently working
			create a new task = state[index]
			change properties according to data from task passed to reducer
			assign to state[index]
			set data of new state to local storage
			return new state to store, not modify original state
			*/
			var index = findIndex(state, action.task.id);
			state[index] = {
	        	...state[index],
	        	name: action.task.name,
	        	id: action.task.id,
	        	status: action.task.status,
	        };
	        localStorage.setItem('tasks',JSON.stringify(state));
	        return[...state];
	    case types.DELETE_TASK:
	    	var index = findIndex(state, action.id);
	    	state.splice(index,1);
	    	localStorage.setItem('tasks',JSON.stringify(state));
	    	return[...state]
	    case types.FILTER_TASK:
	    	if(action.filterName != ''){
                /*
                    loop through all element in tasks array
                    at each element (task), check is the character received from filter.name present in task.name string
                    for example: task.name = học react js
                                 filter.name = học
                                 return true
                    after return true, that element will be saved in new array, because filter method not change the original array
                    that why we have to asign new array to original array (tasks = tasks.filter)
                */
                state = state.filter((task) => {
                    return task.name.toLowerCase().indexOf(action.filterName.toLowerCase()) !== -1;
                });
            }else{
            	/*if there aren't any character in filter name bar => assign state with 
				  tasks from localStorage, because original state now was changed by if statement above
            	*/
            	state = JSON.parse(localStorage.getItem('tasks'));
            }
            if(action.filterStatus !== '-1'){
            	state = state.filter((task) => {
	                if(action.filterStatus === '0'){
	                    return task.status === true ? true : false;
	                }else if(action.filterStatus === '1'){
	                    return task.status === false ? true : false;
	                }else{
	                    return true;
	                }
            	});
            }else{
            	state = JSON.parse(localStorage.getItem('tasks'));
            }
            return[...state]
         case types.SEARCH_TASK:
         	if(action.searchName){
         		state = state.filter((task) => {
		        	return task.name.toLowerCase().indexOf(action.searchName.toLowerCase()) !== -1;
		        });
         	}else{
         		state = JSON.parse(localStorage.getItem('tasks'));
         	}
         	return [...state]
         case types.SORT_TASK:
         	//if sortName is present, mean !==null && !==undefined
	        if(action.sortName === 'name'){
	            state.sort((a,b) => {
	                /*
	                    from a-z if a is greater than b, swap them and opposite
	                    if return positive, swap 2 element and opposite
	                    a.name mean we using name state to sort
	                */
	                if(a.name > b.name){
	                    return action.sortStatus;
	                }else if(a.name < b.name){
	                    return -action.sortStatus;
	                }else{
	                    return 0;
	                }
	            });
	        }

	        if(action.sortName === 'status'){
	            state.sort((a,b) => {
	                /*
	                    TRUE and FALSE if a is greater than b, keep them and opposite
	                    if return positive, swap 2 element and opposite
	                    a.name mean we using status state to sort
	                */
	                if(a.status > b.status){
	                    return -action.sortStatus;
	                }else if(a.status < b.status){
	                    return action.sortStatus;
	                }else{
	                    return 0;
	                }
	            });
	        }
	        return [...state]
		default:
			return state;

	}
};

export default myReducer;