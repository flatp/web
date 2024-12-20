import axios from 'axios';

// Axiosインスタンスの設定
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', //'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ユーザをフォローする関数
export const followUser = async (userId: number, targetUserId: number) => {
  return await apiClient.post(`/users/${userId}/follow/`, { target_user_id: targetUserId });
};

// 投稿にlikeする関数
export const likePost = async (postId: number, userId: number) => {
  return await apiClient.post(`/posts/${postId}/like/`, { user_id: userId });
};

// 投稿のlikeを解除する関数
export const unlikePost = async (postId: number, userId: number) => {
  return await apiClient.post(`/posts/${postId}/unlike/`, { user_id: userId });
};

// ユーザの投稿を取得する関数
export const getUserPosts = async (userId: number) => {
  return await apiClient.get(`/posts/user-posts/${userId}/`);
};

// ユーザがフォローしているユーザの投稿を取得する関数
export const getFollowingPosts = async (userId: number) => {
  return await apiClient.get(`/posts/following-posts/${userId}/`);
};

// 新しい投稿を作成する
export const createPost = async (postData: {
  userid: number;
  name: string;
  shopid: number;
  memo?: string;
}) => {
  return await apiClient.post('/posts/', postData);
};
  
// 投稿を削除する
export const deletePost = async (postId: number) => {
  return await apiClient.delete(`/posts/${postId}/`);
};

// 投稿を削除する
export const getShops = async () => {
  return await apiClient.get(`/shops/`);
};

// likeした投稿を取得する関数
export const getLikePosts = async (userId: number) => {
  return await apiClient.get(`/posts/liked-posts/${userId}/`);
};