/*
	main reducer
	received return from item reducers and return those data to store
*/

import {combineReducers} from 'redux';
import ListAll from './ListAll';
import isDisplayForm from './isDisplayForm';
import taskEditing from './ModifyTask';

//store now have 3 state listAll, isDisplayForm and taskEditing
const myReducer = combineReducers({
	listAll: ListAll,
	isDisplayForm,
	taskEditing
});

export default myReducer;