import React, { useState } from 'react';

const ReactionButtons = ({ initialReactions }) => {
  const [reactions, setReactions] = useState(initialReactions);

  const handleReaction = (reaction) => {
    setReactions({
      ...reactions,
      [reaction]: reactions[reaction] + 1,
    });
  };

  return (
    <div className="reactions-container">
      {Object.keys(reactions).map((reaction) => (
        <button
          key={reaction}
          className={`reaction-button reaction-${reaction}`}
          onClick={() => handleReaction(reaction)}
        >
          {reaction} {reactions[reaction]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
