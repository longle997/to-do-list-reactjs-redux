/*
Because initialState of this action need to be object type
but initialState of ListAll reducer is an array, so we can't use one reducer
main purpose of this reducer is return a state with object type according to which action is dispatch
*/

import * as types from './../constants/ActionTypes';

var initialState = {};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.MODIFY_TASK:
		//we return action.task mean task that we are editting at the moment
			return action.task;
		default:
			return state;

	}
};

export default myReducer;