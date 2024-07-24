import React, { useEffect, useState } from 'react';
import '../css/FacebookWebhook.css';
import ReactionButtons from '../helpers/ReactionButtons';

const FacebookWebhook = ({ entries }) => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const newPosts = {};

    entries.forEach(entry => {
      const postId = entry.changes[0].value.post_id;
      if (!newPosts[postId]) {
        newPosts[postId] = {
          from: entry.changes[0].value.from,
          created_time: entry.changes[0].value.created_time,
          message: entry.changes[0].value.message || '',
          link: entry.changes[0].value.link || '',
          reactions: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0,
          },
        };
      }

      if (entry.changes[0].value.item === 'reaction') {
        const reactionType = entry.changes[0].value.reaction_type;
        newPosts[postId].reactions[reactionType]++;
      }
    });

    setPosts(newPosts);
  }, [entries]);

  return (
    <div className="container">
      {Object.keys(posts).map((postId) => (
        <div key={postId} className="post-card">
          <div className="post-header">
            <img src={`https://graph.facebook.com/${posts[postId].from.id}/picture`} alt="User Avatar" className="user-avatar" />
            <div className="post-user-info">
              <h3>{posts[postId].from.name}</h3>
              <p>{new Date(posts[postId].created_time * 1000).toLocaleString()}</p>
            </div>
          </div>
          <p className="post-message">{posts[postId].message}</p>
          {posts[postId].link && (
            <a href={posts[postId].link} target="_blank" rel="noopener noreferrer">
              <img src={posts[postId].link} alt="Facebook Post" className="post-image" />
            </a>
          )}
          <ReactionButtons initialReactions={posts[postId].reactions} />
        </div>
      ))}
    </div>
  );
};

export default FacebookWebhook;
