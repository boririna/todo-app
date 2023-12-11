// usf create useState
// enf  create export named function
// edf create export default function

import { useState } from 'react';
import styles from './Search.module.css';

export const Search = ({ todos, setTodos }) => {
	const [searchValue, setSearchValue] = useState('');
	const searchTodos = searchValue
		? todos.filter((todo) => todo.title.includes(searchValue))
		: todos;
	return (
		<div className={styles.container}>
			<input
				className={styles.inputField}
				type="text"
				value={searchValue}
				onChange={({ target }) => {
					setSearchValue(target.value);
					setTodos(searchTodos);
				}}
			/>
			{/* <button onClick={() => setTodos(searchTodos)}>Поиск</button> */}
		</div>
	);
};
