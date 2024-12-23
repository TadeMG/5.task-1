import { useState } from 'react';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoSort } from './components/TodoSort/TodoSort';
import { TodoSearch } from './components/TodoSearch/TodoSearch';
import { TodoItem } from './components/TodoItem/TodoItem';
import { useGetData } from './hooks/useGetData';
import { useAddItem } from './hooks/useAddItem';
import { useDeleteItem } from './hooks/useDeleteItem';
import { useChangeItem } from './hooks/useChangeItem';

export const App = () => {
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { todoList, isSorted, setIsSorted, isLoading, setIsLoading } = useGetData({
		refreshTodoList,
	});
	const { addItem } = useAddItem({ setIsLoading, refreshTodoList, setRefreshTodoList });
	const { deleteItem } = useDeleteItem({
		setIsLoading,
		refreshTodoList,
		setRefreshTodoList,
	});
	const { changeItem } = useChangeItem({
		setIsLoading,
		refreshTodoList,
		setRefreshTodoList,
	});

	return (
		<div className={styles.app}>
			<h1 className={styles.appTitle}>Список дел</h1>
			<TodoForm onAdd={addItem} />
			<TodoSort isSorted={isSorted} setIsSorted={setIsSorted} />
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
							onChange={changeItem}
							onDelete={deleteItem}
						/>
					))}
			</ul>
		</div>
	);
};
