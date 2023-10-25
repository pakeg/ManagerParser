import { useEffect, useState, useRef } from 'react';

const useScrollHorizontal = () => {
  const [isScroll, setScroll] = useState(false);

  const boxScroll = useRef(null);
  const buttonScroll = useRef(null);

  useEffect(() => {
    const mouseupEvent = () => {
      buttonScroll.current.parentElement.onmousemove = null;
    };

    if (boxScroll?.current?.scrollWidth > boxScroll?.current?.offsetWidth) {
      setScroll(true);
      const scaleButtonScrollWidth =
        boxScroll.current.scrollWidth / boxScroll.current.offsetWidth;
      buttonScroll.current.style.width =
        Math.floor(boxScroll.current.offsetWidth / scaleButtonScrollWidth) +
        'px';

      let savePosition = 0;
      let endScroll =
        boxScroll.current.offsetWidth - buttonScroll.current.offsetWidth;

      boxScroll.current.onscroll = (e) => {
        savePosition = e.target.scrollLeft / scaleButtonScrollWidth;
        buttonScroll.current.style.transform = `translateX(${Math.ceil(
          savePosition
        )}px)`;
      };
      buttonScroll.current.onmousedown = (e) => {
        let startPosition = e.pageX - savePosition;

        buttonScroll.current.parentElement.onmousemove = (event) => {
          let offsetX = event.pageX - startPosition;
          if (offsetX <= 0) offsetX = 0;
          if (offsetX >= endScroll) offsetX = endScroll;

          buttonScroll.current.style.transform = `translateX(${offsetX}px)`;
          boxScroll.current.scrollLeft = Math.floor(
            offsetX * scaleButtonScrollWidth
          );
          savePosition = offsetX;
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

export default useScrollHorizontal;
