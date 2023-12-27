import { useEffect, useState } from 'react';
import styles from './TodoPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button/Button';
import { useParams } from 'react-router-dom';
import { fetchTodoById } from '../../hooks/requestHook';

export const TodoPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		setIsLoading(true);
		fetchTodoById(id)
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodo(loadedTodo);
			})
			.finally(() => setIsLoading(false));
	}, [id]);

	console.log(todo);

	// const requestEditTodo = () => {
	// 	setIsEditing(!isEditing);
	// 	setInputValue(title);
	// };

	return (
		<>
			{!isLoading ? (
				<div className={styles.todo}>
					<div className={styles.text}>
						{todo.completed ? <span>☑</span> : <span>☐</span>}{' '}
						<p>{todo.title}</p>
					</div>
				</div>
			) : (
				<p>Загрузка</p>
			)}
		</>

		//<div>
		// {isEditing ? (
		// 		<div className={styles.todo}>
		// 			<input
		// 				className={styles.inputField}
		// 				type="text"
		// 				value={inputValue}
		// 				onChange={({ target }) => setInputValue(target.value)}
		// 			/>
		// 			<button disabled={isUpdating} onClick={() => requestUpdateTodo(id)}>
		// 				<FontAwesomeIcon icon="floppy-disk" size="lg" />
		// 			</button>
		// 		</div>
		// 	) : (
		// 		<div className={styles.todo}>
		// 			<div className={styles.text}>
		// 				{completed ? <span>☑</span> : <span>☐</span>} <p>{title}</p>
		// 			</div>
		// 			<div>
		// 				{/* <Button
		// 					disabled={isEditing}
		// 					onClick={requestEditTodo}
		// 					icon="pen-to-square"
		// 				></Button>
		// 				<Button
		// 					disabled={isDeleting}
		// 					onClick={() => requestDeleteTodo(id)}
		// 					icon="trash"
		// 				></Button> */}
		// 			</div>
		// 		</div>
		// 	)}
		// </div> */}
	);
};

export default TodoPage;
