import { useState } from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({ id, title, completed, onDelete, onChange }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);

	const handleTitleChange = (event) => setNewTitle(event.target.value);

	const handleEdit = () => {
		setIsEditing(true);
	};
	const handleSave = () => {
		setIsEditing(false);
		onChange({ id, title: newTitle, completed });
	};

	const handleChecked = () => {
		onChange({ id, title, completed: !completed });
	};

	return (
		<li className={styles.todoListItem} key={id}>
			<input
				name="todoCheckbox"
				className={styles.todoCheckbox}
				type="checkbox"
				checked={completed}
				onChange={handleChecked}
			/>
			{isEditing ? (
				<input
					name="todoEditInput"
					className={styles.todoEditInput}
					value={newTitle}
					onChange={handleTitleChange}
				/>
			) : (
				<span className={styles.todoTitle}>{title}</span>
			)}
			{isEditing ? (
				<button className={styles.button} onClick={handleSave}>
					Сохранить
				</button>
			) : (
				<button className={styles.button} onClick={handleEdit}>
					Изменить
				</button>
			)}
			<button className={styles.button} onClick={() => onDelete(id)}>
				Удалить
			</button>
		</li>
	);
};
