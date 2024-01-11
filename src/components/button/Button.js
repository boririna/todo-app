import styles from './Button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../context';
import { useContext } from 'react';

export const Button = ({ requestUpdateTodo, id }) => {
	const { isUpdating } = useContext(AppContext);
	return (
		<button disabled={isUpdating} onClick={() => requestUpdateTodo(id)}>
			<FontAwesomeIcon icon="floppy-disk" size="lg" />
		</button>
	);
};
