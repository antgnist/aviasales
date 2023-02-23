import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Ticket from '../Ticket/Ticket';
import classes from './TicketsList.module.scss';

function TicketsList() {
  const tickets = useAppSelector((state) => state.tickets);
  const visibleCount = useAppSelector((state) => state.visibleCount);
  const dispatch = useAppDispatch();
  const { setVisibleCount } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  const arrTicket = [];
  for (let i = 0; i < Math.min(visibleCount, tickets.length); i++) {
    const key = tickets[i].segments
      ? tickets[i].carrier +
        tickets[i].segments![0].date +
        tickets[i].segments![0].origin
      : crypto.randomUUID();
    arrTicket.push(
      <Ticket
        price={tickets[i].price}
        durTo={tickets[i].segments[0].duration}
        durAway={tickets[i].segments[1].duration}
        key={key}
      />,
    );
  }

  return (
    <div className={classes.ticketsList}>
      {arrTicket}

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
