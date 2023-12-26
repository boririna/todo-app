import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';
import { Outlet } from 'react-router-dom';

export const Button = ({ disabled, onClick, icon }) => {
	return (
		<button disabled={disabled} onClick={onClick}>
			<FontAwesomeIcon icon={icon} size="lg" />
		</button>
	);
};
