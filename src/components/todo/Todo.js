import styles from './Todo.module.css';
import { Link } from 'react-router-dom';

export const Todo = ({ id, title, completed }) => {
	return (
		<div key={id} className={styles.todo}>
			<div className={styles.text}>
				{completed ? <span>☑</span> : <span>☐</span>}{' '}
				<Link to={`task/${id}`}>{title}</Link>
			</div>
		</div>
	);
};
