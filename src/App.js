import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from './firebase';
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
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);
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

	let sortedTodos = isSorted
		? _.orderBy(Object.entries(searchTodos), ['id'], ['asc'])
		: searchTodos;

	console.log(Object.entries(searchTodos));
	const sortAscending = () => {
		setIsSorted(!isSorted);
	};

	const todosDbRef = ref(db, 'todos');

	useEffect(() => {
		// onValue() функция-подписчик, типа EventListener
		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	const requestAddTodo = () => {
		setIsAdding(true);

		push(todosDbRef, {
			userId: 8,
			title: inputValue,
			completed: false,
		})
			.then((response) => {
				console.log('Дело добавлено, ответ сервера', response);
			})
			.finally(() => {
				setIsAdding(false);
				setInputValue('');
			});
	};

	const requestUpdateTodo = (todoID) => {
		setIsUpdating(true);
		const todoChangeDbRef = ref(db, `todos/${todoID}`);

		set(todoChangeDbRef, {
			userId: 8,
			title: newInputValue,
			completed: false,
		})
			.then((response) => {
				console.log('Дело обновлено, ответ сервера', response);
			})
			.finally(() => setIsUpdating(false));
	};

	const requestDeleteTodo = (todoID) => {
		setIsDeleting(true);
		const todoChangeDbRef = ref(db, `todos/${todoID}`);
		remove(todoChangeDbRef)
			.then((response) => {
				console.log('Дело удалено, ответ сервера', response);
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
					Object.entries(sortedTodos).map(([id, { title, completed }]) => (
						<Todo
							id={id}
							title={title}
							completed={completed}
							isDeleting={isDeleting}
							requestDeleteTodo={requestDeleteTodo}
							inputValue={newInputValue}
							setInputValue={setNewInputValue}
							isUpdating={isUpdating}
							requestUpdateTodo={requestUpdateTodo}
						/>
					))
				)}
			</div>
		</div>
	);
};
