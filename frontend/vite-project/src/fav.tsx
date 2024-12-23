import { useEffect, useState } from 'react';
import { getLikePosts, unlikePost } from './api';
import PostCard from './postcard';

export const Fav = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchLikePosts = async () => {
      try {
        const response = await getLikePosts(1);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    const handleLike = async (postId:number, userId:number) => {
      try {
        await unlikePost(postId, userId);
        await fetchLikePosts();
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    };

    const handleUnlike = async (postId:number, userId:number) => {
      try {
        await unlikePost(postId, userId);
        await fetchLikePosts();
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    };

    useEffect(() => {
      fetchLikePosts();
      }, []);

    return (
        <ul className="todo-list">
            {posts.map((post:any) => {
            return (
              <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onUnlike={handleUnlike}
            />
            );
            })}
        </ul>
    )
}