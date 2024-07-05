import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(apiUrl);
  return response.data;
};
