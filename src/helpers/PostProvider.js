import React, { createContext, useState } from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  const addPost = (post) => {
    setPosts((prevPosts) => ({
      ...prevPosts,
      [post.post_id]: {
        ...post,
        reactions: {
          like: 0,
          love: 0,
          haha: 0,
          wow: 0,
          sad: 0,
          angry: 0,
        },
      },
    }));
  };

  const addReaction = (postId, reactionType) => {
    setPosts((prevPosts) => ({
      ...prevPosts,
      [postId]: {
        ...prevPosts[postId],
        reactions: {
          ...prevPosts[postId].reactions,
          [reactionType]: prevPosts[postId].reactions[reactionType] + 1,
        },
      },
    }));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, addReaction }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
