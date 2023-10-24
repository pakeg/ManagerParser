import { useEffect, useState, useRef } from 'react';

const useScroll = () => {
  const [isScroll, setScroll] = useState(false);

  const boxScroll = useRef(null);
  const buttonScroll = useRef(null);

  useEffect(() => {
    const mouseupEvent = () => {
      buttonScroll.current.parentElement.onmousemove = null;
    };

    if (boxScroll?.current?.scrollHeight > boxScroll?.current?.offsetHeight) {
      setScroll(true);
      const scaleButtonScrollHeight =
        boxScroll.current.scrollHeight / boxScroll.current.offsetHeight;
      buttonScroll.current.style.height =
        Math.floor(boxScroll.current.offsetHeight / scaleButtonScrollHeight) +
        'px';

      let savePosition = 0;
      let endScroll =
        boxScroll.current.offsetHeight - buttonScroll.current.offsetHeight;

      boxScroll.current.onscroll = (e) => {
        savePosition = e.target.scrollTop / scaleButtonScrollHeight;
        buttonScroll.current.style.transform = `translateY(${Math.ceil(
          savePosition
        )}px)`;
      };
      buttonScroll.current.onmousedown = (e) => {
        let startPosition = e.pageY - savePosition;

        buttonScroll.current.parentElement.onmousemove = (event) => {
          let offsetY = event.pageY - startPosition;
          if (offsetY <= 0) offsetY = 0;
          if (offsetY >= endScroll) offsetY = endScroll;

          buttonScroll.current.style.transform = `translateY(${offsetY}px)`;
          boxScroll.current.scrollTop = Math.floor(
            offsetY * scaleButtonScrollHeight
          );
          savePosition = offsetY;
        };
      };

      document.addEventListener('mouseup', mouseupEvent);
    } else {
      setScroll(false);
    }

    return () => {
      document.removeEventListener('mouseup', mouseupEvent);
    };
  }, [boxScroll?.current?.scrollHeight]);

  return { isScroll, boxScroll, buttonScroll };
};

export default useScroll;
