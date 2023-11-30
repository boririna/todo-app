import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);

	const requestAddTodo = () => {
		setIsAdding(true);
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 8,
				title: 'Купить помидоры и огруцы',
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело добавлено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsAdding(false));
	};

	const requestUpdateTodo = () => {
		setIsUpdating(true);
		fetch('http://localhost:3000/todos/8', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 8,
				title: 'Купить помидоры и огруцы',
				completed: true,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsUpdating(false));
	};

	const requestDeleteTodo = () => {
		setIsDeleting(true);
		fetch('http://localhost:3000/todos/12', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsDeleting(false));
	};

	return (
		<div className={styles.App}>
			<div className={styles.Container}>
				<h1>Todos</h1>
				{isLoading ? (
					<p>Loading ...</p>
				) : (
					todos.map(({ userId, id, title, completed }) => (
						<div className={styles.todo} key={id}>
							{completed ? <span>☑</span> : <span>☐</span>} {title}
						</div>
					))
				)}

				<button disabled={isAdding} onClick={requestAddTodo}>
					Добавить дело
				</button>
				<button disabled={isUpdating} onClick={requestUpdateTodo}>
					Обновить дело
				</button>
				<button disabled={isDeleting} onClick={requestDeleteTodo}>
					Удалить дело
				</button>
			</div>
		</div>
	);
};
