import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
  IStateTickets,
  IFilter,
  IFilterKeys,
} from '../../interfaces/interfaces';
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
  const dispatch = useAppDispatch();
  const { setVisibleCount } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  const filterForTickets = (ticketsArr: IStateTickets, nowFilters: IFilter) => {
    if (!Object.values(nowFilters).includes(true)) return [...ticketsArr];
    const mapFilter: IMapFilter = { without: 0, one: 1, two: 2, three: 3 };
    const activeFilters: (number | undefined)[] = [];

    Object.keys(nowFilters).forEach((key) => {
      if (nowFilters[key as IFilterKeys] && key !== 'all') {
        activeFilters.push(mapFilter[key as IFilterKeys]);
      }
    });

    return ticketsArr.filter((ticket) => {
      const stopsA = ticket.segments[0].stops.length;
      const stopsB = ticket.segments[1].stops.length;
      if (activeFilters.includes(stopsA) && activeFilters.includes(stopsB)) {
        return true;
      }
      return false;
    });
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
        return tickets;
      }
    }
  };

  const quantityForTickets = (ticketsArr: IStateTickets, count: number) =>
    ticketsArr.slice(0, count);

  const visibleTikets = quantityForTickets(
    sortForTikets(filterForTickets(tickets, filters), sort),
    visibleCount,
  );

  return (
    <div className={classes.ticketsList}>
      {visibleTikets.map((ticket) => {
        const key = ticket.segments
          ? ticket.carrier +
            ticket.segments![0].date +
            ticket.segments![0].origin
          : crypto.randomUUID();

        return (
          <Ticket price={ticket.price} ToAway={ticket.segments} key={key} />
        );
      })}

      <button
        type="button"
        className={classes.ticketsList__more}
        onClick={() => setVisibleCount(5)}
      >
        Показать ещё 5 билетов!
      </button>
    </div>
  );
}

export default TicketsList;
