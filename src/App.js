import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.App}>
			<div className={styles.Container}>
				<h1>Todos</h1>
				{todos.map(({ userId, id, title, completed }) => (
					<div className={styles.todo} key={id}>
						{completed ? <span>☑</span> : <span>☐</span>} {title}
					</div>
				))}
			</div>
		</div>
	);
};
