import cn from 'classnames';
import { useState, useMemo } from 'react';
// import { useEffect } from 'react';
// import ApiService from '../../services/ApiService';

import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Filters from '../Filters';
import Loader from '../Loader';
import Sort from '../Sort';
import TicketsList from '../TicketsList';
import classes from './App.module.scss';

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const clazz = cn({ [`${classes.app}`]: true });

  const counter = useAppSelector((state) => state.num);
  const tickets = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();
  const { inc, dec, rnd, test } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  return (
    <div className={classes.app__wrapper}>
      <div className={clazz}>
        <div>
          Состояние: {counter}
          <button
            style={{ backgroundColor: 'green' }}
            type="button"
            onClick={() => {
              inc();
            }}
          >
            Увеличить
          </button>
          <button
            style={{ backgroundColor: 'green' }}
            type="button"
            onClick={() => {
              dec();
            }}
          >
            Уменьшить
          </button>
          <button
            style={{ backgroundColor: 'green' }}
            type="button"
            onClick={() => {
              rnd();
            }}
          >
            Рандом
          </button>
          <button
            style={{ backgroundColor: 'yellow' }}
            type="button"
            onClick={() => {
              test();
            }}
          >
            Добавить билет
          </button>
        </div>

        <button
          style={{ backgroundColor: 'red' }}
          type="button"
          onClick={() => {
            setLoading((oldL) => !oldL);
            console.log(tickets);
          }}
        >
          Переключить загрузку
        </button>
        <header className={classes.app__header}>
          <Loader loading={loading} />
        </header>
        <main className={classes.app__body}>
          <section className={classes.app__sidebar}>
            <Filters />
          </section>
          <section className={classes.app__content}>
            <Sort />
            <TicketsList />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
