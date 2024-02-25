const initialState = {
	isLoading: false,
	isAdding: false,
	isUpdating: false,
	isDeleting: false,
	refreshTodos: false,
	todos: [],
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}

		case 'SET_ISADDING': {
			return {
				...state,
				isAdding: payload,
			};
		}

		case 'SET_ISDELETING': {
			return {
				...state,
				isDeleting: payload,
			};
		}

		case 'SET_ISUPDATING': {
			return {
				...state,
				isDeleting: payload,
			};
		}

		case 'SET_TODOS': {
			return {
				...state,
				todos: payload,
			};
		}

		case 'REFRESH_TODOS': {
			return {
				...state,
				refershTodos: payload,
			};
		}

		// case 'REQUEST_ADD_TODO': {
		// 	return {
		// 		...state,
		// 		todo: payload,
		// 	};
		// }

		default:
			return state;
	}
};
