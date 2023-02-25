import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Error from '../Errors/Error';
import Filters from '../Filters';
import Loader from '../Loader';
import Sort from '../Sort';
import TicketsList from '../TicketsList';
import classes from './App.module.scss';

function App(): JSX.Element {
  const clazz = cn({ [`${classes.app}`]: true });
  const error = useAppSelector((state) => state.error);
  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const { ticketsAfterAuth } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );
  useEffect(() => {
    ticketsAfterAuth();
  }, [ticketsAfterAuth]);

  return (
    <div className={classes.app__wrapper}>
      {error && <Error />}
      <div className={clazz}>
        {/* <div>
          <button
            style={{ backgroundColor: 'pink' }}
            type="button"
            onClick={() => {
              ticketsAfterAuth();
            }}
          >
            ПАЧКУ БИЛЕТОВ
          </button>
        </div> */}
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
