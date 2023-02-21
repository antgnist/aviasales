import Ticket from '../Ticket/Ticket';
import classes from './TicketsList.module.scss';

function TicketsList() {
  return (
    <div className={classes.ticketsList}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <button type="button" className={classes.ticketsList__more}>
        Показать ещё 5 билетов!
      </button>
    </div>
  );
}

export default TicketsList;
