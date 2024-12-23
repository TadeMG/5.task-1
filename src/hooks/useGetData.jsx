import { useEffect, useState } from 'react';

export const useGetData = ({ refreshTodoList }) => {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

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

	return { todoList, isSorted, setIsSorted, isLoading, setIsLoading };
};
