import { useEffect, useState } from 'react';
import styles from './App.module.css';
import _ from 'lodash';
import { Todo } from './components/todo/Todo';
import { Search } from './components/search/Search';
import { library } from '@fortawesome/fontawesome-svg-core';
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
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsAdding,
	selectLoading,
	selectRefreshTodos,
	selectTodos,
} from './store/selectors';
import {
	requestAddTodo,
	setIsAdding,
	setIsDeleting,
	setIsUpdating,
	setLoading,
	setRefreshTodos,
	setTodos,
} from './store/actions';

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

export const App = () => {
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectLoading);
	const isAdding = useSelector(selectIsAdding);
	// const refreshTodos = useSelector(selectRefreshTodos);

	const [refreshTodos, setRefreshTodos] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [newInputValue, setNewInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const dispatch = useDispatch();

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
		dispatch(setTodos());
		// fetch('http://localhost:3005/todos')
		// 	.then((loadedData) => loadedData.json())
		// 	.then((loadedTodos) => {
		// 		setTodos(loadedTodos);
		// 	})
		// 	.finally(() => dispatch(setLoading(false)));
	}, [refreshTodos]);

	// dispatch(requestAddTodo(inputValue, refreshTodos, setRefreshTodos, setInputValue));

	const requestAddTodo = () => {
		dispatch(setIsAdding(true));

		fetch('http://localhost:3005/todos', {
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
				// dispatch(setRefreshTodos(!refreshTodos));
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				dispatch(setIsAdding(false));
				setInputValue('');
			});
	};

	const requestUpdateTodo = (todoID) => {
		// setIsUpdating(true);
		dispatch(setIsUpdating(true));
		fetch(`http://localhost:3005/todos/${todoID}`, {
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
				// dispatch(setRefreshTodos(!refreshTodos));
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => dispatch(setIsUpdating(false)));
	};

	const requestDeleteTodo = (todoID) => {
		// setIsDeleting(true);
		dispatch(setIsDeleting(true));
		fetch(`http://localhost:3005/todos/${todoID}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				// dispatch(setRefreshTodos(!refreshTodos));
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => dispatch(setIsDeleting(false)));
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
						<Todo
							id={id}
							title={title}
							completed={completed}
							requestDeleteTodo={requestDeleteTodo}
							inputValue={newInputValue}
							setInputValue={setNewInputValue}
							requestUpdateTodo={requestUpdateTodo}
						/>
					))
				)}
			</div>
		</div>
	);
};
