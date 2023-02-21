import classes from './Filters.module.scss';

function Filters() {
  return (
    <div className={classes.filters}>
      <div className={classes.filters__header}>Количество пересадок</div>
      <div className={classes.filters__body}>
        <label htmlFor="all" className={`${classes.filters__label}`}>
          <input className={classes.check__input} type="checkbox" id="all" />
          <span className={classes.check__box} />
          Все
        </label>

        <label htmlFor="nothig" className={`${classes.filters__label}`}>
          <input
            className={classes.check__input}
            type="checkbox"
            name="nothing"
            id="nothig"
          />
          <span className={classes.check__box} />
          Без пересадок
        </label>

        <label htmlFor="1" className={`${classes.filters__label}`}>
          <input className={classes.check__input} type="checkbox" id="1" />
          <span className={classes.check__box} />1 пересадка
        </label>

        <label htmlFor="2" className={`${classes.filters__label}`}>
          <input className={classes.check__input} type="checkbox" id="2" />
          <span className={classes.check__box} />2 пересадки
        </label>

        <label htmlFor="3" className={`${classes.filters__label}`}>
          <input className={classes.check__input} type="checkbox" id="3" />
          <span className={classes.check__box} />3 пересадки
        </label>
      </div>
    </div>
  );
}

export default Filters;
