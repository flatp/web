import axios from 'axios';

// Axiosインスタンスの設定
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', //'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // localStorageからトークンを取得
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorizationヘッダーにトークンを設定
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await apiClient.post(`/token/`, {
    email,
    password,
  });
  return response.data; // { access: "jwt_access_token", refresh: "jwt_refresh_token" }
};

export const logout = async () => {
  await apiClient.post(`/logout/`); // 必要に応じてサーバー側でトークンを無効化
};

// ユーザをフォローする関数
export const followUser = async (targetUserId: number) => {
  return await apiClient.post(`/users/${targetUserId}/follow/`);
};

// 投稿にlikeする関数
export const likePost = async (postId: number) => {
  return await apiClient.post(`/posts/${postId}/like/`);
};

// 投稿のlikeを解除する関数
export const unlikePost = async (postId: number) => {
  return await apiClient.post(`/posts/${postId}/unlike/`);
};

// ユーザの投稿を取得する関数
export const getUserPosts = async () => {
  return await apiClient.get(`/posts/user-posts/`);
};

// ユーザがフォローしているユーザの投稿を取得する関数
export const getFollowingPosts = async () => {
  return await apiClient.get(`/posts/following-posts/`);
};

// ユーザの投稿を取得する関数
export const getPopularPosts = async (searchText: string) => {
  return await apiClient.get(`/posts/popular-posts/${searchText}`);
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

// 店舗一覧を取得する
export const getShops = async () => {
  return await apiClient.get(`/shops/`);
};

// 店舗をID指定で取得する
export const getShopbyID = async (shopId: number) => {
  return await apiClient.get(`/shops/${shopId}/`);
};

// likeした投稿を取得する関数
export const getLikePosts = async () => {
  return await apiClient.get(`/posts/liked-posts/`);
};

// 店舗を検索で取得する
export const getShopbySearch = async (searchText: string) => {
  return await apiClient.get(`/shops/${searchText}`);
};