export const fetchTodos = async () => {
	const data = await fetch('http://localhost:3000/todos');
	return data;
};

export const fetchTodoById = async (id) => {
	const data = await fetch(`http://localhost:3000/todos/${id}`);
	return data;
};
