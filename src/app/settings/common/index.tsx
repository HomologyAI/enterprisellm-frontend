'use client';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';


import { SettingsCommonProps } from './Common';
import Theme from './Theme';
import { Flexbox } from 'react-layout-kit';

export default memo<SettingsCommonProps>((props) => {
  const { t } = useTranslation('setting');

  return (
    <Flexbox  style={{marginLeft: '30px'}}>
      <Theme />
    </Flexbox>
  );
});
