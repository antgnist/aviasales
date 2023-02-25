import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
  IStateTickets,
  IFilter,
  IFilterKeys,
} from '../../interfaces/interfaces';
import ErrorNotFound from '../Errors/ErrorNotFound';
import InitialLoader from '../InitialLouder';
import Ticket from '../Ticket/Ticket';
import classes from './TicketsList.module.scss';

interface IMapFilter {
  without: 0;
  one: 1;
  two: 2;
  three: 3;
  all?: number;
}

function TicketsList() {
  const tickets = useAppSelector((state) => state.tickets);
  const visibleCount = useAppSelector((state) => state.visibleCount);
  const sort = useAppSelector((state) => state.sort);
  const filters = useAppSelector((state) => state.filters);
  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const { setVisibleCount } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  const filterForTickets = (ticketsArr: IStateTickets, nowFilters: IFilter) => {
    if (!Object.values(nowFilters).includes(true)) return [...ticketsArr];
    const mapFilter: IMapFilter = { without: 0, one: 1, two: 2, three: 3 };
    const activeSoftFilters: (number | undefined)[] = [];
    const activeStrictFilters: (number | undefined)[] = [];

    Object.keys(nowFilters).forEach((key) => {
      if (nowFilters[key as IFilterKeys] && key !== 'all') {
        if (key === 'without') {
          activeStrictFilters.push(mapFilter[key as IFilterKeys]);
        } else {
          activeSoftFilters.push(mapFilter[key as IFilterKeys]);
        }
      }
    });

    const ticketsFilters = ticketsArr.filter((ticket) => {
      const stopsA = ticket.segments[0].stops.length;
      const stopsB = ticket.segments[1].stops.length;
      if (
        activeStrictFilters.includes(stopsA) &&
        activeStrictFilters.includes(stopsB)
      ) {
        return true;
      }
      if (
        activeSoftFilters.includes(stopsA) ||
        activeSoftFilters.includes(stopsB)
      ) {
        return true;
      }
      return false;
    });

    return ticketsFilters;
  };

  const sortForTikets = (ticketsArr: IStateTickets, sortKey: string) => {
    switch (sortKey) {
      case 'optimal': {
        return ticketsArr;
      }
      case 'price': {
        return [...ticketsArr].sort((a, b) => a.price - b.price);
      }
      case 'fast': {
        return [...ticketsArr].sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration),
        );
      }
      default: {
        return ticketsArr;
      }
    }
  };

  const quantityForTickets = (ticketsArr: IStateTickets, count: number) =>
    ticketsArr.slice(0, count);

  const totalVisibleTikets = sortForTikets(
    filterForTickets(tickets, filters),
    sort,
  );
  const visibleTikets = quantityForTickets(totalVisibleTikets, visibleCount);

  const showMoreBiletsCount = Math.min(
    totalVisibleTikets.length - visibleTikets.length,
    5,
  );

  return (
    <div className={classes.ticketsList}>
      {!loading && visibleTikets.length <= 0 && <ErrorNotFound />}
      {loading && visibleTikets.length <= 0 && <InitialLoader />}

      {visibleTikets.map((ticket) => (
        <Ticket
          price={ticket.price}
          carrier={ticket.carrier}
          ToAway={ticket.segments}
          key={ticket.id}
        />
      ))}
      {totalVisibleTikets.length > visibleTikets.length && (
        <button
          type="button"
          className={classes.ticketsList__more}
          onClick={() => setVisibleCount(showMoreBiletsCount)}
        >
          Показать ещё {showMoreBiletsCount} билет
          {showMoreBiletsCount === 5 && 'ов'}
          {(showMoreBiletsCount === 2 ||
            showMoreBiletsCount === 3 ||
            showMoreBiletsCount === 4) &&
            'а'}
          !
        </button>
      )}
    </div>
  );
}

export default TicketsList;
