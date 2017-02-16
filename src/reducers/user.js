import {
	SAVE_USER,
	DELETE_USER
} from '../actions';

const initialState = {
	token: null,
}

function user (state = initialState,action){
	switch (action.type){
		case SAVE_USER:
			return {
				'token':action.token,
			};
		case DELETE_USER:
			return initialState;
		default:
			return state;
	}

}

export default user;
