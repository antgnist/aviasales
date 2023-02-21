import cn from 'classnames';
import { useState } from 'react';
// import { useEffect } from 'react';
// import ApiService from '../../services/ApiService';
import Filters from '../Filters';
import Loader from '../Loader';
import Sort from '../Sort';
import TicketsList from '../TicketsList';
import classes from './App.module.scss';
import tickets from './tickets.json';

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const clazz = cn({ [`${classes.app}`]: true });

  return (
    <div className={classes.app__wrapper}>
      <div className={clazz}>
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
