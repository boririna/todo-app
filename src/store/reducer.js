const initialState = { isLoading: false, todos: [] };

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'SET_TODOS': {
			return {
				...state,
				todos: payload,
			};
		}
		default:
			return state;
	}
};
