import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IFilterKeys } from '../../interfaces/interfaces';
import classes from './Filters.module.scss';

type ICheckTempllate = {
  id: IFilterKeys;
  label: string;
  action: () => void;
}[];

function Filters() {
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const { changeAnyFilter } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  const checkboxes: ICheckTempllate = [
    {
      id: 'all',
      label: 'Все',
      action: () => {
        changeAnyFilter('all');
      },
    },
    {
      id: 'without',
      label: 'Без пересадок',
      action: () => {
        changeAnyFilter('without');
      },
    },
    {
      id: 'one',
      label: '1 пересадка',
      action: () => {
        changeAnyFilter('one');
      },
    },
    {
      id: 'two',
      label: '2 пересадки',
      action: () => {
        changeAnyFilter('two');
      },
    },
    {
      id: 'three',
      label: '3 пересадки',
      action: () => {
        changeAnyFilter('three');
      },
    },
  ];

  const checkboxesElem = checkboxes.map((checkbox) => (
    <label
      key={checkbox.id}
      htmlFor={checkbox.id}
      className={`${classes.filters__label}`}
    >
      <input
        className={classes.check__input}
        type="checkbox"
        id={checkbox.id}
        checked={filters[checkbox.id]}
        onChange={checkbox.action}
      />
      <span className={classes.check__box} />
      {checkbox.label}
    </label>
  ));

  return (
    <div className={classes.filters}>
      <div className={classes.filters__header}>Количество пересадок</div>
      <div className={classes.filters__body}>{checkboxesElem}</div>
    </div>
  );
}

export default Filters;
