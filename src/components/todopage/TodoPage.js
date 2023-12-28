import { useEffect, useState } from 'react';
import styles from './TodoPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodoById } from '../../hooks/useRequestFetch';
import { useRequestUpdateTodo } from '../../hooks/useRequestUpdateTodo';
import { useRequestDeleteTodo } from '../../hooks/useRequestDeleteTodo';

export const TodoPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [inputValue, setInputValue] = useState('');

	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		fetchTodoById(id)
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodo(loadedTodo);
			})
			.finally(() => setIsLoading(false));
	}, [id]);

	const requestEditTodo = () => {
		setIsEditing(!isEditing);
		setInputValue(todo.title);
	};

	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(
		inputValue,
		setIsEditing,
	);

	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo();

	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			{isEditing ? (
				<div className={styles.todo}>
					<input
						className={styles.inputField}
						type="text"
						value={inputValue}
						onChange={({ target }) => setInputValue(target.value)}
					/>
					<button
						disabled={isUpdating}
						onClick={() => {
							requestUpdateTodo(id);
						}}
					>
						<FontAwesomeIcon icon="floppy-disk" size="lg" />
					</button>
				</div>
			) : !isLoading ? (
				<div className={styles.todo}>
					<div className={styles.text}>
						{todo.completed ? <span>☑</span> : <span>☐</span>}
						<p>{todo.title}</p>
					</div>
					<div>
						<Button
							disabled={isEditing}
							onClick={() => requestEditTodo()}
							icon="pen-to-square"
						></Button>
						<Button
							disabled={isDeleting}
							onClick={() => requestDeleteTodo(id)}
							icon="trash"
						></Button>
					</div>
				</div>
			) : (
				<div>Загрузка</div>
			)}
			<Button icon="arrow-left" onClick={() => navigate(-1)}></Button>
		</div>
	);
};

export default TodoPage;
