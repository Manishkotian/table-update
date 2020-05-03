import { createStore } from 'redux'
const initialState = {
		fileDetails: [],
		tableValue: []
}
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'FILE_UPLOAD_SUCCESS': {
			return {
				...state,
				fileDetails: action.payload
			}
		}
		case 'FILE_UPLOAD_FAILURE': {
			return {
				...state,
				fileDetails: [],
				fileUploadError: action.payload || true
			}
		}
		case 'SET_TABLE_VALUE': {
			return {
				...state,
				tableValue: action.payload
			}
		}
		case 'RESET_TABLE_VALUE': {
			return {
				...state,
				tableValue: []
			}
		}
		default:
			return state;
	}
};

export const store = createStore(reducer);

