// PostCard.tsx
import React from 'react';

interface PostProps {
  post: any;
  onLike: (postId: number, userId: number) => void;
  onUnlike: (postId: number, userId: number) => void;
}

const PostCard: React.FC<PostProps> = ({ post, onLike, onUnlike }) => {
  const id_to_date = (id: number) => {
    const date = new Date(id);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  const date = id_to_date(post.id);
  
  const post_user_like = (likeds: number) => {
    if(1 == likeds) return true;
      return false;
  };

  return (
    <li className="todo-item">
      <div className="post_top">
        <div className="todo-user">{post.user.name}</div>
        <div className="todo-date2">{date}</div>
      </div>
      <div className="todo-details">
        <h3>{post.name}</h3>
        <h4>{post.shop.name}</h4>
        <div className="todo-date">{post.memo}</div>
        {!post_user_like(post.liked) && (
          <button className="fav-button" onClick={() => onLike(post.id, 1)}>
            ♡
          </button>
        )}
        {post_user_like(post.liked) && (
          <button className="fav-button" onClick={() => onUnlike(post.id, 1)}>
            ❤
          </button>
        )}
      </div>
    </li>
  );
};

export default PostCard;
