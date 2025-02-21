export const addTaskApi = async (task) => {
  const url = '/tasks';

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    const newTask = await response.json();
    console.log('Task added successfully:', newTask);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const getAllTasksApi = async () => {
  const url = `/tasks`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get post : ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getTaskByIdApi = async (id) => {
  const url = `/tasks/${id}`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get post : ${response.statusText}`);
    }

    const text = await response.text(); // Read response as text first
    console.log('Raw API Response:', text);

    const data = JSON.parse(text); // Now parse JSON manually
    console.log('Parsed API Data:', data);
    console.log('✅ Parsed API Data:', data);
    console.log('🛠 Type of mentors:', typeof data.mentors, data.mentors);

    // const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getTaskByMentorIdApi = async (mentorId) => {
  const url = `/tasks`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get post : ${response.statusText}`);
    }

    const text = await response.text(); // Read response as text first

    const data = JSON.parse(text); // Now parse JSON manually

    const updatedData = data.filter((item) => item.mentors.includes(mentorId));

    // console.log('updated Data', updatedData);

    return updatedData;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getTodaysTasksApi = async (dueDate) => {
  const url = `/tasks`;
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get post : ${response.statusText}`);
    }

    const data = await response.json();

    const updatedData = data.filter((item) => item.dueDate.includes(dueDate));

    console.log('updated Data', updatedData);

    return updatedData;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getTasksCreatedInDateRange = async (startDate, endDate) => {
  const url = `/tasks`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get tasks: ${response.statusText}`);
    }

    const data = await response.json();

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filter tasks where dueDate falls within the given range
    const filteredTasks = data.filter((task) => {
      const taskDueDate = new Date(task.createdAt);
      return taskDueDate >= start && taskDueDate <= end;
    });

    return filteredTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
