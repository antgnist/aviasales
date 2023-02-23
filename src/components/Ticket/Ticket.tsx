import classes from './Ticket.module.scss';
import img from './icon.png';

interface IToAway {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
}

interface ITicket {
  price: number;
  ToAway: IToAway[];
}

function Ticket({ price, ToAway }: ITicket) {
  const [to, away] = ToAway;

  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <div className={classes.ticket__price}>{price} Р</div>
        <div className={classes.ticket__carrier}>
          <img width={99} src={img} alt="carrier" />
        </div>
      </div>
      <div className={classes.ticket__body}>
        <div className={`${classes.ticket__forth} ${classes.ticket__row}`}>
          <div
            className={`${classes.ticket__destination} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>
              {to.origin} - {to.destination}
            </div>
            <div className={classes.ticket__data}>10:45 - 08:00</div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>21ч 15м ({to.duration})</div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>
              {to.stops.length} ПЕРЕСАДКИ
            </div>
            <div className={classes.ticket__data}>{to.stops.join(', ')}</div>
          </div>
        </div>

        <div className={`${classes.ticket__back} ${classes.ticket__row}`}>
          <div
            className={`${classes.ticket__destination} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>
              {away.origin} - {away.destination}
            </div>
            <div className={classes.ticket__data}>11:20 - 00:50</div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>
              13ч 20м ({away.duration})
            </div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>
              {away.stops.length} ПЕРЕСАДКА
            </div>
            <div className={classes.ticket__data}>{away.stops.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
