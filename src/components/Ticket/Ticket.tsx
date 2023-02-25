import { format } from 'date-fns';
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

const formatPrice = (price: number) => {
  const strPrice = String(price);
  if (price < 1000) return strPrice;

  const resultStr: string = `${formatPrice(
    Number(strPrice.slice(0, strPrice.length - 3)),
  )} ${strPrice.slice(strPrice.length - 3)}`;

  return resultStr;
};

const minToTime = (duration: number) => {
  const minutes = Math.floor(duration % 60);
  const hours = Math.floor((duration / 60) % 24);
  const days = Math.floor(duration / (60 * 24));
  const daysView = days > 0 ? `${days}д` : '';
  let hoursView;
  if (hours > 0) {
    hoursView = hours < 10 ? `0${hours}ч` : `${hours}ч`;
  } else {
    hoursView = '';
  }
  const minutesView = minutes < 10 ? `0${minutes}м` : `${minutes}м`;

  return `${daysView} ${hoursView} ${minutesView}`.trim();
};

function Ticket({ price, ToAway }: ITicket) {
  const [to, away] = ToAway;

  const timeZoneOffset = new Date(to.date).getTimezoneOffset() * 60000;
  const toOrigTime = format(
    new Date(Date.parse(to.date) + timeZoneOffset),
    "HH':'mm",
  );
  const toDestinTime = format(
    new Date(Date.parse(to.date) + timeZoneOffset + to.duration * 60000),
    "HH':'mm",
  );
  const awayOrigTime = format(
    new Date(Date.parse(away.date) + timeZoneOffset),
    "HH':'mm",
  );
  const awayDestinTime = format(
    new Date(Date.parse(away.date) + timeZoneOffset + away.duration * 60000),
    "HH':'mm",
  );

  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <div className={classes.ticket__price}>{formatPrice(price)} Р</div>
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
            <div className={classes.ticket__data}>
              {toOrigTime} - {toDestinTime}
            </div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>{minToTime(to.duration)}</div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>
              {to.stops.length} ПЕРЕСАД
              {to.stops.length === 1 && 'КА'}
              {(to.stops.length === 2 ||
                to.stops.length === 3 ||
                to.stops.length === 4) &&
                'КИ'}
              {(to.stops.length === 0 || to.stops.length > 4) && 'ОК'}
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
            <div className={classes.ticket__data}>
              {awayOrigTime} - {awayDestinTime}
            </div>
          </div>

          <div
            className={`${classes.ticket__duration} ${classes.ticket__column}`}
          >
            <div className={classes.ticket__label}>В ПУТИ</div>
            <div className={classes.ticket__data}>
              {minToTime(away.duration)}
            </div>
          </div>

          <div className={`${classes.ticket__stops} ${classes.ticket__column}`}>
            <div className={classes.ticket__label}>
              {away.stops.length} ПЕРЕСАД
              {away.stops.length === 1 && 'КА'}
              {(away.stops.length === 2 ||
                away.stops.length === 3 ||
                away.stops.length === 4) &&
                'КИ'}
              {(away.stops.length === 0 || away.stops.length > 4) && 'ОК'}
            </div>
            <div className={classes.ticket__data}>{away.stops.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
