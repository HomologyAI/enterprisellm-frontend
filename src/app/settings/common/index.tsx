'use client';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';


import { SettingsCommonProps } from './Common';
import Theme from './Theme';

export default memo<SettingsCommonProps>((props) => {
  const { t } = useTranslation('setting');

  return (
    <>
      {/* <PageTitle title={t('tab.common')} /> */}
      <Theme />
    </>
  );
});
