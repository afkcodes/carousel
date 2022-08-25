import { useEffect, useRef, useState } from 'react';
import useWindowResize from './hooks/useWindowResize';
import { getElementDimensions } from './utils/utils';

const data = [
  { name: 'Ashish', number: 1 },
  { name: 'Ashish', number: 2 },
  { name: 'Ashish', number: 3 },
  { name: 'Ashish', number: 4 },
  { name: 'Ashish', number: 5 },
  { name: 'Ashish', number: 6 },
  { name: 'Ashish', number: 7 },
  { name: 'Ashish', number: 8 },
  { name: 'Ashish', number: 9 },
  { name: 'Ashish', number: 11 },
  { name: 'Ashish', number: 12 },
  { name: 'Ashish', number: 13 },
  { name: 'Ashish', number: 14 },
  { name: 'Ashish', number: 15 },
  { name: 'Ashish', number: 16 },
  { name: 'Ashish', number: 17 },
  { name: 'Ashish', number: 18 },
  { name: 'Ashish', number: 19 },
  { name: 'Ashish', number: 20 },
];

const App = () => {
  const windowSize = useWindowResize();
  const elementRef = useRef<HTMLDivElement>(null);
  const parentElementRef = useRef<HTMLDivElement>(null);
  const [childDimension, setChildDimension] = useState({
    height: 0,
    width: 0,
    size: 0,
  });
  const [parentDimension, setParentDimension] = useState({
    height: 0,
    width: 0,
    size: 0,
  });

  const [itemsToShow, setItemsToShow] = useState(0);
  const [slideOffSet, setSlideOffSet] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(data.length);

  useEffect(() => {
    if (elementRef?.current) {
      const elementDimension = getElementDimensions(elementRef.current);
      setChildDimension({ ...childDimension, ...elementDimension });
    }
    if (parentElementRef?.current) {
      const elementDimension = getElementDimensions(parentElementRef.current);
      setParentDimension({ ...parentDimension, ...elementDimension });
    }
    if (window instanceof Window) {
      setItemsToShow(Math.floor(parentDimension.width / childDimension.size));
    }
  }, [windowSize.width]);

  console.log({ itemsToShow, slideOffSet, totalItemsCount });

  return (
    <>
      <div className='flex items-center mt-4'>
        <div
          className={`flex items-center h-80 w-full bg-slate-300 overflow-hidden `}
          ref={parentElementRef}>
          <div
            style={{ transform: `translateX(${-slideOffSet}px)` }}
            className={`w-full flex transition ease-in-out duration-1000`}>
            {data.map((item, index) => (
              <div key={`${Math.random()}_${Date.now()}`}>
                <div
                  className='bg-teal-500 h-60 w-60 mx-2 flex items-center justify-center'
                  ref={elementRef}>
                  <span className='font-bold text-4xl'>
                    {index + 1} - {itemsToShow}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center '>
        <button
          className='bg-teal-500 my-12 p-2 text-xl '
          onClick={() => {
            if (totalItemsCount > itemsToShow) {
              setSlideOffSet(slideOffSet + childDimension.size);
              // setSlideOffSet(slideOffSet + itemsToShow * childDimension.size);
              setTotalItemsCount(totalItemsCount - 1);
            }
          }}>
          slide
        </button>
      </div>
    </>
  );
};

export default App;
