import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoSort } from './components/TodoSort/TodoSort';
import { TodoSearch } from './components/TodoSearch/TodoSearch';
import { TodoItem } from './components/TodoItem/TodoItem';

export const App = () => {
	const [todoList, setTodoList] = useState([]);
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/todos')
			.then((data) => data.json())
			.then((todos) => {
				setTodoList(todos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodoList]);

	useEffect(() => {
		if (isSorted) {
			setTodoList((prevList) =>
				[...prevList].sort((a, b) => a.title.localeCompare(b.title)),
			);
		} else {
			setTodoList((prevList) => [...prevList].sort((a, b) => a.id - b.id));
		}
	}, [isSorted]);

	const handleItemAdd = ({ title, setTitleInput }) => {
		if (title.length > 0) {
			setIsLoading(true);

			fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					id: Date.now(),
					title: title,
					completed: false,
				}),
			})
				.then(() => setRefreshTodoList(!refreshTodoList))
				.finally(() => {
					setTitleInput('');
				});
		}
	};

	const handleItemDelete = (id) => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		}).then(() => setRefreshTodoList(!refreshTodoList));
	};

	const handleItemChange = ({ id, title, completed }) => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id,
				title,
				completed,
			}),
		}).then(() => setRefreshTodoList(!refreshTodoList));
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.appTitle}>Список дел</h1>
			<TodoForm onAdd={handleItemAdd} isLoading={isLoading} />
			<TodoSort
				isLoading={isLoading}
				isSorted={isSorted}
				setIsSorted={setIsSorted}
			/>
			<TodoSearch onSearch={setSearchValue} searchValue={searchValue} />

			<Loader visible={isLoading} />

			<ul className={styles.todoList}>
				{todoList
					.filter(({ title }) =>
						title.toLowerCase().includes(searchValue.toLowerCase()),
					)
					.map(({ id, title, completed }) => (
						<TodoItem
							key={id}
							id={id}
							title={title}
							completed={completed}
							onChange={handleItemChange}
							onDelete={handleItemDelete}
						/>
					))}
			</ul>
		</div>
	);
};
