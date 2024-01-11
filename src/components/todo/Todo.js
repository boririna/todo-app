import { useState } from 'react';
import styles from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button/Button';

export const Todo = ({
	id,
	title,
	completed,
	isDeleting,
	requestDeleteTodo,
	inputValue,
	setInputValue,
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
					<Button requestUpdateTodo={() => requestUpdateTodo(id)} />
				</div>
			) : (
				<div className={styles.todo}>
					<div className={styles.text}>
						{completed ? <span>☑</span> : <span>☐</span>} <p>{title}</p>
					</div>
					<div>
						<button disabled={isEditing} onClick={requestEditTodo}>
							<FontAwesomeIcon icon="pen-to-square" size="lg" />
						</button>
						<button
							disabled={isDeleting}
							onClick={() => requestDeleteTodo(id)}
						>
							<FontAwesomeIcon icon="trash" size="lg" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Todo;
