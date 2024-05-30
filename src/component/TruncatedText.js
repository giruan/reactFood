import React, { useEffect, useRef, useState } from 'react';

const TruncatedText = ({ text, maxWidth }) => {
  const spanRef = useRef(null);
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    const truncateText = (text, maxWidth, ellipsis) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = window.getComputedStyle(spanRef.current).font;

      if (context.measureText(text).width <= maxWidth) {
        return text;
      }

      while (context.measureText(text + ellipsis + '"').width > maxWidth) {
        text = text.slice(0, -1);
      }

      return text + ellipsis + '"';
    };

    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      const truncated = truncateText(text, spanWidth, '...');
      setTruncatedText(truncated);
    }
  }, [text, maxWidth]);

  return (
    <span
      ref={spanRef}
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      title={text}
    >
      {truncatedText}
    </span>
  );
};

export default TruncatedText;
