import classes from './Sort.module.scss';

function Sort() {
  return (
    <div className={classes.sort}>
      <button
        type="button"
        className={`${classes.sort__button} ${classes['sort__button--active']}`}
      >
        Самый дешевый
      </button>
      <button type="button" className={classes.sort__button}>
        Самый быстрый
      </button>
      <button type="button" className={classes.sort__button}>
        Оптимальный
      </button>
    </div>
  );
}

export default Sort;
