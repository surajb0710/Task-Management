import { getTasksCreatedInDateRange } from './tasks';

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
  const url = '/mentors';

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mentor),
    });

    if (!response.ok) {
      throw new Error(`Failed to add mentor: ${response.statusText}`);
    }

    const newMentor = await response.json();
    console.log('Mentor added successfully:', newMentor);
    return newMentor;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
