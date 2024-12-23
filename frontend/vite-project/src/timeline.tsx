import { useEffect, useState } from 'react';
import { getFollowingPosts, likePost, unlikePost } from './api';
import PostCard from './postcard';

export const Timeline = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchFollowingPosts = async () => {
      try {
        const response = await getFollowingPosts(1);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    const handleLike = async (postId:number, userId:number) => {
      try {
        await likePost(postId, userId);
        await fetchFollowingPosts();
      } catch (error) {
        console.error('Error liking post:', error);
      }
    };

    const handleUnlike = async (postId:number, userId:number) => {
      try {
        await unlikePost(postId, userId);
        await fetchFollowingPosts();
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    };

    useEffect(() => {
      fetchFollowingPosts();
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