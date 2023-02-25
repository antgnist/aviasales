import classes from './InitialLoader.module.scss';

function InitialLoader() {
  return (
    <div className={classes.initialLoader}>
      <div className={classes['initialLoader__spinner-wrapper']}>
        <div className={classes.initialLoader__spinner} />
      </div>
    </div>
  );
}

export default InitialLoader;
