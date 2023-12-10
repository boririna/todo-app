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
		setInputValue(title);
	};

	return (
		<div key={id}>
			{isEditing ? (
				<div className={styles.todo}>
					<input
						className={styles.inputField}
						type="text"
						value={inputValue}
						onChange={({ target }) => setInputValue(target.value)}
					/>
					<button disabled={isUpdating} onClick={() => requestUpdateTodo(id)}>
						Сохранить
					</button>
				</div>
			) : (
				<div className={styles.todo}>
					<div className={styles.text}>
						{completed ? <span>☑</span> : <span>☐</span>} {title}
					</div>
					<div>
						<button disabled={isEditing} onClick={requestEditTodo}>
							Редактировать
						</button>
						<button
							disabled={isDeleting}
							onClick={() => requestDeleteTodo(id)}
						>
							Удалить
						</button>
					</div>
				</div>
			)}

			{/* <button disabled={isDeleting} onClick={() => requestDeleteTodo(id)}>
				Удалить
			</button> */}
		</div>
	);
};

export default Todo;
