import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch } from '../../hooks/hooks';
import classes from './Sort.module.scss';

function Sort() {
  const dispatch = useAppDispatch();
  const { setSortPrice, setSortFast } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  return (
    <div className={classes.sort}>
      <button
        type="button"
        className={`${classes.sort__button} ${classes['sort__button--active']}`}
        onClick={setSortPrice}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={classes.sort__button}
        onClick={setSortFast}
      >
        Самый быстрый
      </button>
      <button type="button" className={classes.sort__button}>
        Оптимальный
      </button>
    </div>
  );
}

export default Sort;
