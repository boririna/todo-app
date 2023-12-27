import { useEffect, useState } from 'react';
import styles from './App.module.css';
import _ from 'lodash';
import { Todo } from './components/todo/Todo';
import { TodoPage } from './components/todopage/TodoPage';
import { Search } from './components/search/Search';
import { NotFound } from './components/notfound/NotFound';
import { Button } from './components/button/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Routes, Route, Link } from 'react-router-dom';
import {
	faPenToSquare,
	faTrash,
	faPlus,
	faFloppyDisk,
	faMagnifyingGlass,
	faArrowDownAZ,
	faArrowUpZA,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTodos } from './hooks/requestHook';

library.add(
	faPenToSquare,
	faTrash,
	faPlus,
	faFloppyDisk,
	faMagnifyingGlass,
	faArrowDownAZ,
	faArrowUpZA,
	faRotateLeft,
);

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [newInputValue, setNewInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const handleChange = ({ target }) => {
		setSearchValue(target.value);
	};

	let searchTodos = searchValue
		? todos.filter((todo) =>
				todo.title.toLowerCase().includes(searchValue.toLowerCase()),
		  )
		: todos;
	let sortedTodos = isSorted ? _.orderBy(searchTodos, ['title'], ['asc']) : searchTodos;

	const sortAscending = () => {
		setIsSorted(!isSorted);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchTodos()
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
				title: inputValue,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело добавлено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				setIsAdding(false);
				setInputValue('');
			});
	};

	const requestUpdateTodo = (todoID) => {
		setIsUpdating(true);
		fetch(`http://localhost:3000/todos/${todoID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 3,
				title: newInputValue,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено, ответ сервера', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsUpdating(false));
	};

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
			.finally(() => setIsDeleting(false));
	};

	return (
		<div className={styles.App}>
			<div className={styles.Container}>
				<div className={styles.todoSearch}>
					<h1>Todos</h1>
					<Search onChange={handleChange} searchValue={searchValue} />
				</div>

				<input
					className={styles.inputField}
					type="text"
					value={inputValue}
					onChange={({ target }) => setInputValue(target.value)}
				/>
				<div className={styles.buttons}>
					<button disabled={isAdding} onClick={requestAddTodo}>
						<FontAwesomeIcon icon="plus" size="lg" />
					</button>
					{isSorted ? (
						<button onClick={sortAscending}>
							<FontAwesomeIcon icon="rotate-left" size="lg" />
						</button>
					) : (
						<button onClick={sortAscending}>
							<FontAwesomeIcon icon="arrow-down-a-z" size="lg" />
						</button>
					)}
				</div>
				{isLoading ? (
					<p>Loading ...</p>
				) : (
					sortedTodos.map(({ userId, id, title, completed }) => (
						<div>
							<Todo
								id={id}
								title={title}
								completed={completed}
								// isDeleting={isDeleting}
								// requestDeleteTodo={requestDeleteTodo}
								// inputValue={newInputValue}
								// setInputValue={setNewInputValue}
								// isUpdating={isUpdating}
								// requestUpdateTodo={requestUpdateTodo}
							/>

							{/* <Button></Button> */}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="task/:id" element={<TodoPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
