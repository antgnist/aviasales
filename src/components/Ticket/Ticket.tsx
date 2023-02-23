import classes from './Ticket.module.scss';
import img from './icon.png';

interface ITicket {
  price: number;
  durTo: number;
  durAway: number;
}

function Ticket({ price, durTo, durAway }: ITicket) {
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
            <div className={classes.ticket__label}>MOW - HKT</div>
            <div className={classes.ticket__data}>10:45 - 08:00</div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>21ч 15м ({durTo})</div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>2 ПЕРЕСАДКИ</div>
            <div className={classes.ticket__data}>HKG, JNB</div>
          </div>
        </div>

        <div className={`${classes.ticket__back} ${classes.ticket__row}`}>
          <div
            className={`${classes.ticket__destination} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>HKT - MOW</div>
            <div className={classes.ticket__data}>11:20 - 00:50</div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>13ч 20м ({durAway})</div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>1 ПЕРЕСАДКА</div>
            <div className={classes.ticket__data}>HKG</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
