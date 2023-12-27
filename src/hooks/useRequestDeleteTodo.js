import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const navigate = useNavigate();
	const requestDeleteTodo = (todoID) => {
		setIsDeleting(true);
		fetch(`http://localhost:3000/todos/${todoID}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				setIsDeleting(false);
				navigate('/');
			});
	};

	return {
		isDeleting,
		requestDeleteTodo,
	};
};
