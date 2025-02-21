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

export const addUser = async (user) => {
  const url = '/users';

  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
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
