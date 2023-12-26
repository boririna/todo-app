import { useState } from 'react';
import styles from './TodoPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button/Button';
import { useParams } from 'react-router-dom';

export const TodoPage = ({
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
	// const id = useParams();

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
						<FontAwesomeIcon icon="floppy-disk" size="lg" />
					</button>
				</div>
			) : (
				<div className={styles.todo}>
					<div className={styles.text}>
						{completed ? <span>☑</span> : <span>☐</span>} <p>{title}</p>
					</div>
					<div>
						{/* <Button
							disabled={isEditing}
							onClick={requestEditTodo}
							icon="pen-to-square"
						></Button>
						<Button
							disabled={isDeleting}
							onClick={() => requestDeleteTodo(id)}
							icon="trash"
						></Button> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoPage;
