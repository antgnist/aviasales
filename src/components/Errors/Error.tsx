import { Alert } from 'antd';
// import { useMemo } from 'react';
// import { bindActionCreators } from 'redux';
// import * as actions from '../../actions/actions';
// import { useAppDispatch } from '../../hooks/hooks';

function Error() {
  // const dispatch = useAppDispatch();
  // const { cleanConnectionError } = useMemo(
  //   () => bindActionCreators(actions, dispatch),
  //   [dispatch],
  // );

  return (
    <Alert
      message="Ошибка приложения."
      description=" Мы уже всё чиним... Попробуйте перезагрузить страницу."
      type="error"
      showIcon
      closable
      onClose={() => {}}
    />
  );
}

export default Error;
