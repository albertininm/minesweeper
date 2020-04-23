import React from 'react';

const Failure = ({restart, failed}) => {
  return (
    <div className={`fail-banner${!failed ? ' hidden' : ''}`}>
      <div className="fail-banner-title">You failed!</div>
      <div className="fail-banner-try-again" onClick={() => restart()}>Try again</div>
    </div>
  );
}

export default Failure;