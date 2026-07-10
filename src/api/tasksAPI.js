const URI = 'http://localhost:3001/tasks';

const headers = {
    'Content-Type': 'application/json',
};

const tasksAPI = {
    getAll: () => {
        return fetch(URI).then((response) => response.json());
    },
    add: (newTask) => {
        return fetch(URI, {
            method: 'POST',
            headers,
            body: JSON.stringify(newTask),
        }).then((response) => response.json());
    },
    delete: (taskId) => {
        return fetch(`${URI}/${taskId}`, {
            method: 'DELETE',
        });
    },
    deleteAll: (tasks) => {
        return Promise.all(
            tasks.map(({ id }) => {
                return tasksAPI.delete(id);
            }),
        );
    },
    update: (taskId, isDone) => {
        return fetch(`${URI}/${taskId}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ isDone }),
            })
    },
};

export default tasksAPI;
