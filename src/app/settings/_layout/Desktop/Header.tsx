'use client';

import { ChatHeader, ChatHeaderTitle } from '@lobehub/ui';
import { Tag ,Button } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { LeftOutlined} from "@ant-design/icons";
import { useActiveSettingsKey } from '@/hooks/useActiveSettingsKey';
import { SettingsTabs } from '@/store/global/initialState';
import { useRouter } from 'next/navigation';

const Header = memo(() => {
  const router = useRouter();
  const { t } = useTranslation('setting');

  const activeKey = useActiveSettingsKey();

  const onClickBackNavigation = () => {
    router.back()
  }

  return (
    <ChatHeader
      left={
        <div style={{ paddingLeft: 8 }}>
          <ChatHeaderTitle
            title={
              <Flexbox align={'center'} gap={8} horizontal>
                {/* {t(`tab.${activeKey}`)} */}
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => onClickBackNavigation()}
                    style={{
                      alignSelf: "center",
                      fontSize: '18px',
                      justifyContent: 'center',
                      lineHeight: '1rem'
                      // height: 64,
                      // width: 64,
                    }}
                    type="text"
                  >
                    设置
                  </Button>
                {activeKey === SettingsTabs.Sync && <Tag color={'gold'}>{t('tab.experiment')}</Tag>}
              </Flexbox>
            }
          />
        </div>
      }
      style={{backdropFilter: 'none', background: 'none', border: 'none'}}
    />
  );
});

export default Header;
