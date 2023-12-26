import styles from './Todo.module.css';

export const Todo = ({ id, title, completed }) => {
	return (
		<div key={id} className={styles.todo}>
			<div className={styles.text}>
				{completed ? <span>☑</span> : <span>☐</span>} <p>{title}</p>
			</div>
		</div>
	);
};
