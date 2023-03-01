import { Alert } from 'antd';
import { useMemo } from 'react';

import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function ErrorConnection() {
  const errorConnection = useAppSelector((state) => state.errorConnection);
  const dispatch = useAppDispatch();
  const { cleanConnectionError } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  return errorConnection ? (
    <Alert
      message="Проблемы с сетью. Проверьте ваше интернет-соединение."
      type="warning"
      showIcon
      closable
      banner
      onClose={cleanConnectionError}
    />
  ) : null;
}

export default ErrorConnection;
