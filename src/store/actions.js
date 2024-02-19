export const setLoading = (loading) => ({
	type: 'SET_LOADING',
	payload: loading,
});

export const setTodos = () => {
	return (dispatch) => {
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
