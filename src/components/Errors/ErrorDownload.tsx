import { Alert } from 'antd';
import { useMemo } from 'react';

import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function ErrorDownload() {
  const errorDownload = useAppSelector((state) => state.errorDownload);
  const dispatch = useAppDispatch();
  const { cleanDownloadError } = useMemo(
    () => bindActionCreators(actions, dispatch),
    [dispatch],
  );

  return errorDownload ? (
    <Alert
      message="Ошибка загрузки. Результаты могут быть не полными."
      showIcon
      closable
      banner
      style={{
        backgroundColor: '#ffff',
        boxShadow: '0px 2px 8px rgb(0 0 0 / 10%)',
        borderRadius: '5px',
      }}
      onClose={cleanDownloadError}
    />
  ) : null;
}

export default ErrorDownload;
