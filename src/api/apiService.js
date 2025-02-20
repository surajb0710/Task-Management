//-----------Mentor-----------//

export const getAllMentorsApi = async () => {
  const url = '/mentors';

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get mentors : ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getRecentMentorsApi = async () => {
  const date = new Date();

  const todaysDate = `${date.getFullYear()}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, '0')}-${date.getDate()}`;

  date.setDate(date.getDate() - 7);

  const oneWeekBack = `${date.getFullYear()}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  try {
    const tasks = await getTasksCreatedInDateRange(oneWeekBack, todaysDate);

    const mentorList = [...new Set(tasks.flatMap((task) => task.mentors))];

    const mentors = await Promise.all(
      mentorList.map((mentorId) => getMentorByIdApi(mentorId))
    );

    return mentors;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getMonthlyMentorsApi = async () => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1); // Move back 1 month

  try {
    const allMentors = await getAllMentorsApi(); // Fetch all mentors

    const mentorsWithRecentReviews = allMentors.filter((mentor) => {
      return mentor.reviews.some((review) => {
        const reviewDate = new Date(review.createdAt);
        return reviewDate >= lastMonth && reviewDate <= today;
      });
    });

    return mentorsWithRecentReviews;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getMentorByIdApi = async (id) => {
  const url = `/mentors/${id}`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get mentors : ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const addMentor = async (mentor) => {
  const url = '/posts';

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mentor),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    const newMentor = await response.json();
    console.log('Mentor added successfully:', newMentor);
    return newMentor;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

//-----------Tasks-----------//

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

//-----------Users-----------//

export const getUserByIdApi = async (id) => {
  const url = `/users/${id}`;

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to get user : ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
