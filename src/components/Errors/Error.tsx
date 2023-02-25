import classes from './Error.module.scss';

function Error() {
  return (
    <div className={classes.error}>
      <span className={classes.error__header}>Ошибка приложения</span>
      <span className={classes.error__body}>
        Мы уже всё чиним... Попробуйте перезагрузить страницу.
      </span>
    </div>
  );
}

export default Error;
