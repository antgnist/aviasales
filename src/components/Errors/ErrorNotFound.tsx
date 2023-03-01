import classes from './ErrorNotFound.module.scss';

function ErrorNotFound() {
  return (
    <div className={classes.errorNotFound}>
      <div>Рейсов, подходящих под заданные критерии, не найдено</div>
    </div>
  );
}

export default ErrorNotFound;
