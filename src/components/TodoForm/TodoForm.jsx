import { useState } from 'react';
import styles from './TodoForm.module.css';

export const TodoForm = ({ onAdd, isLoading }) => {
	const [titleInput, setTitleInput] = useState('');

	const handleTitleInput = (event) => {
		setTitleInput(event.target.value);
	};

	const handleSubmit = () => {
		onAdd({ title: titleInput, setTitleInput });
	};

	return (
		<form className={styles.todoForm}>
			<input
				type="text"
				name="titleInput"
				value={titleInput}
				className={styles.titleInput}
				onChange={handleTitleInput}
			/>
			<button
				disabled={isLoading || titleInput.length < 1}
				type="submit"
				className={styles.button}
				onClick={handleSubmit}
			>
				Добавить в список
			</button>
		</form>
	);
};
