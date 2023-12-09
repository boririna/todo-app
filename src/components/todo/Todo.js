import styles from './Todo.module.css';

export const Todo = ({ id, title, completed, isDeleting, requestDeleteTodo }) => {
	return (
		<div className={styles.todo} key={id}>
			<div>
				{completed ? <span>☑</span> : <span>☐</span>} {title}
			</div>
			{/* <button disabled={isUpdating} onClick={requestUpdateTodo}>
				Редактировать
			</button> */}
			<button disabled={isDeleting} onClick={() => requestDeleteTodo(id)}>
				Удалить
			</button>
		</div>
	);
};

export default Todo;
