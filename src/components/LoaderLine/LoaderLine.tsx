import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

interface ILoaderProp {
  loading: boolean;
}

function LoaderLine({ loading }: ILoaderProp) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let intervalId: any;
    if (loading === true) {
      setProgress(10);
      intervalId = setInterval(() => {
        setProgress((oldProgress) => (oldProgress < 90 ? oldProgress + 5 : 90));
      }, 1000);
    }
    if (loading === false) {
      setProgress(100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [loading]);

  return <LoadingBar color="#ff6f32" progress={progress} loaderSpeed={3000} />;
}

export default LoaderLine;
