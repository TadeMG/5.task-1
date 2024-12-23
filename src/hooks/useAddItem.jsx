export const useAddItem = ({ setIsLoading, refreshTodoList, setRefreshTodoList }) => {
	const addItem = ({ title, setTitleInput }) => {
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
				.then(() => {
					setTitleInput('');
				});
		}
	};

	return { addItem };
};
