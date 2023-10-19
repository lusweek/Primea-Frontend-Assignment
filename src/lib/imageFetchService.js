import axios from 'axios';

// Using vite gives 403 forbidden error
// import { unsplashApiKey } from '../../config';


export async function searchImages(query, pageNr) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${pageNr}`, {
      params: {
        query,
      },
      headers: {
        Authorization: "Client-ID d9Tag2qfDv8Z9_VQp3haGB2PRa4PhNoyKvRD8gHobII",
        // Authorization: `Client-ID ${unsplashApiKey}`,
      },
    });
    console.log('response', response)
    return response;
  } catch (error) {
    console.error('Error searching for images:', error);
    throw error;
  }
}
