import { useState, useEffect } from 'react';
const KeyHandler = cb => {
    const [keyPressed, setKeyPressed] = useState();
    useEffect(() => {
      const onKeyDown = e => {
        const { key } = e;
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {         
          e.preventDefault();
        }
          if (key === 'Backspace' || key == 'Control') e.preventDefault();
          setKeyPressed(key);
          if (cb) cb(key);
      };
      window.addEventListener('keydown', onKeyDown);
  
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    });
    return keyPressed;
  };
  
  export default KeyHandler;