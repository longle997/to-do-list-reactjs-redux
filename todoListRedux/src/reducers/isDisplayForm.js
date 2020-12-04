/*
Because initialState of this action need to be boolean type
but initialState of ListAll reducer is an array, so we can't use one reducer
main purpose of this reducer is return a state with boolean type according to which action is dispatch
*/

import * as types from './../constants/ActionTypes';

var initialState = false;

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.TOGGLE_FORM:
			return !state;
		case types.CLOSE_FORM:
			return false;
		case types.OPEN_FORM:
			return true;
		default:
			return state;

	}
};

export default myReducer;