export const setLoading = (loading) => ({
	type: 'SET_LOADING',
	payload: loading,
});

export const setIsAdding = (isAdding) => ({
	type: 'SET_ISADDING',
	payload: isAdding,
});

export const setIsUpdating = (isUpdating) => ({
	type: 'SET_ISUPDATING',
	payload: isUpdating,
});

export const setIsDeleting = (isDeleting) => ({
	type: 'SET_ISDELETING',
	payload: isDeleting,
});

export const setRefreshTodos = (refreshTodos) => ({
	type: 'REFRESH_TODOS',
	payload: refreshTodos,
});

export const setTodos = () => {
	return (dispatch) => {
		dispatch(setLoading(true));
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				dispatch({
					type: 'SET_TODOS',
					payload: loadedTodos,
				});
				// setTodos(loadedTodos);
			})
			.finally(() => dispatch(setLoading(false)));
	};
};
