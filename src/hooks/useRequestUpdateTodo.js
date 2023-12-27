import { useState } from 'react';

export const useRequestUpdateTodo = (inputValue) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);

	const requestUpdateTodo = (todoID) => {
		setIsUpdating(true);
		fetch(`http://localhost:3000/todos/${todoID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 3,
				title: inputValue,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				setIsUpdating(false);
				// setIsEditing(!isEditing);
			});
	};

	return { isUpdating, requestUpdateTodo };
};
