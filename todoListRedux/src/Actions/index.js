/*
	action is contain 2 parts (type of action and data)
	type of action help us identify which action is dispatch in reducer
	data was received from component where user can interact with web page (which is button or input)
	data will be passed to reducer and be processed
*/

import * as types from './../constants/ActionTypes'

export const listAll = () => {
	return {
		type: types.LIST_ALL
	}
}

export const AddItem = (task) => {
	return {
		type: types.ADD_ITEM,
		task //task: task
	}
}

export const ToggleForm = () => {
	return {
		type: types.TOGGLE_FORM
	}
}

export const CloseForm = () => {
	return {
		type: types.CLOSE_FORM
	}
}

export const OpenForm = () => {
	return {
		type: types.OPEN_FORM
	}
}

// we need to receive id in order to 
export const UpdateStatusTask = (id) => {
	return {
		type: types.UPDATE_STATUS_TASK,
		id //id : id
	}
}

// we need to receive id in order to pass to reducer and find index from it
export const ModifyTask = (task) => {
	return {
		type: types.MODIFY_TASK,
		task //task : task
	}
}

export const UpdateTask = (task) => {
	return {
		type: types.UPDATE_TASK,
		task //task : task
	}
}

export const DeleteTask = (id) => {
	return {
		type: types.DELETE_TASK,
		id
	}
}

export const FilterTask = (filterName, filterStatus) => {
	return {
		type: types.FILTER_TASK,
		filterName,
		filterStatus
	}
}

export const SearchTask = (searchName) => {
	return {
		type: types.SEARCH_TASK,
		searchName
	}
}

export const SortTask = (sortName, sortStatus) => {
	return {
		type: types.SORT_TASK,
		sortName,
		sortStatus
	}
}