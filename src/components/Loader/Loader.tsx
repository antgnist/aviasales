import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useImageSize } from 'react-image-size';
import backdrop from './Form.svg';
import classes from './Loader.module.scss';
import model from './Plane.svg';

interface ILoaderProp {
  loading: boolean;
}

function Loader({ loading }: ILoaderProp) {
  const [animateDir, setAnimateDir] = useState(true);
  const [dataBackdrop] = useImageSize(backdrop);
  const [dataModel] = useImageSize(model);

  useEffect(() => {
    let timerId: any;
    if (loading) {
      timerId = setInterval(() => {
        setAnimateDir((oldAnimateDir) => !oldAnimateDir);
      }, 1500);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [loading]);

  let modelIndent: number = 0;

  if (dataBackdrop && dataModel) {
    modelIndent = dataBackdrop.width / 2 - dataModel.width / 2;
  }

  const modelClasses = cn({
    [classes.loader__model]: true,
    [`${classes['loader__model--invisible']}`]: !modelIndent,
    [`${classes['loader__model--animate-bottom']}`]: loading && !animateDir,
    [`${classes['loader__model--animate-top']}`]: loading && animateDir,
  });
  const backdropClasses = cn({
    [classes.loader__backdrop]: true,
  });

  return (
    <div className={classes.loader}>
      <img src={backdrop} alt="" className={backdropClasses} />
      <img
        src={model}
        alt=""
        className={modelClasses}
        style={{ left: modelIndent }}
      />
    </div>
  );
}

export default Loader;
