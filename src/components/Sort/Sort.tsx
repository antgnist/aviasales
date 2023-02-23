import cn from 'classnames';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import classes from './Sort.module.scss';

function Sort() {
  const sort = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();
  const { setFastSort, setPriceSort, setOptimalSort } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  const buttons = [
    { name: 'price', label: 'Самый дешевый', action: setPriceSort },
    { name: 'fast', label: 'Самый быстрый', action: setFastSort },
    { name: 'optimal', label: 'Оптимальный', action: setOptimalSort },
  ];

  const buttonsElem = buttons.map((button) => (
    <button
      key={button.name}
      type="button"
      name={button.name}
      className={cn({
        [`${classes.sort__button}`]: true,
        [`${classes['sort__button--active']}`]: button.name === sort,
      })}
      onClick={button.action}
    >
      {button.label}
    </button>
  ));

  return <div className={classes.sort}>{buttonsElem}</div>;
}

export default Sort;
