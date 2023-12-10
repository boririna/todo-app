import { useState } from 'react';
import styles from './Todo.module.css';

export const Todo = ({
	id,
	title,
	completed,
	isDeleting,
	requestDeleteTodo,
	inputValue,
	setInputValue,
	isUpdating,
	requestUpdateTodo,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const requestEditTodo = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className={styles.todo} key={id}>
			{isEditing ? (
				<div>
					<input
						className={styles.inputField}
						type="text"
						value={inputValue}
						onChange={({ target }) => setInputValue(target.value)}
					/>
					<button disabled={isUpdating} onClick={requestUpdateTodo}>
						Сохранить
					</button>
				</div>
			) : (
				<div>
					<div>
						{completed ? <span>☑</span> : <span>☐</span>} {title}
					</div>
					<button disabled={isEditing} onClick={requestEditTodo}>
						Редактировать
					</button>
				</div>
			)}

			{/* <button disabled={isEditing} onClick={requestEditTodo}>
				Редактировать
			</button> */}
			<button disabled={isDeleting} onClick={() => requestDeleteTodo(id)}>
				Удалить
			</button>
		</div>
	);
};

export default Todo;
