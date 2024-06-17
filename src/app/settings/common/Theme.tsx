import { type ItemGroup, SelectWithImg } from '@lobehub/ui';
import { Form as AntForm } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import isEqual from 'fast-deep-equal';
import { useSyncSettings } from '@/app/settings/hooks/useSyncSettings';
import { imageUrl } from '@/const/url';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';
import { createStyles } from 'antd-style';
import { CustomPrimaryModeType } from '@/const/theme';

type SettingItemGroup = ItemGroup;

export const useStyles = createStyles(({ css, token }) => ({
  SelectWithImg: css`
    flex-wrap: wrap;
    gap: 75px;
  `,
}));

const Theme = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = AntForm.useForm();

  const settings = useUserStore(settingsSelectors.currentSettings, isEqual);
  const [primaryColor, setSettings] = useUserStore((s) => [
    settingsSelectors.currentSettings(s).primaryColor,
    s.setSettings,
  ]);

  const handleSettingPrimary = (v: CustomPrimaryModeType) => {
    console.log(v)
    setSettings({ primaryColor: v || '' });
  }

  useSyncSettings(form);

  const {styles} = useStyles()

  // const theme: SettingItemGroup = {
  //   children: [
  //     {
  //       children: (

  //       ),
  //       label: t('settingTheme.themeMode.title'),
  //       minWidth: undefined,
  //     },
  //     // {
  //     //   children: <ThemeSwatchesPrimary />,
  //     //   desc: t('settingTheme.primaryColor.desc'),
  //     //   label: t('settingTheme.primaryColor.title'),
  //     //   minWidth: undefined,
  //     // },
  //     // {
  //     //   children: <ThemeSwatchesNeutral />,
  //     //   desc: t('settingTheme.neutralColor.desc'),
  //     //   label: t('settingTheme.neutralColor.title'),
  //     //   minWidth: undefined,
  //     // },
  //   ],
  //   icon: Palette,
  //   title: t('settingTheme.title'),
  // };



  return (
    // <Form
    //   form={form}
    //   initialValues={settings}
    //   items={[theme]}
    //   onValuesChange={setSettings}
    //   {...FORM_STYLE}
    // />
    <SelectWithImg
      className={styles.SelectWithImg}
      defaultValue={primaryColor}
      height={153}
      onChange={handleSettingPrimary}
      options={[
        {
          img: imageUrl('primary_common.png'),
          label: '默认主题',
          value: 'common',
        },
        {
          img: imageUrl('primary_blue.png'),
          label: '冰川蓝',
          value: 'blue',
        },              {
          img: imageUrl('primary_purple.png'),
          label: '炫彩紫',
          value: 'purple',
        },              {
          img: imageUrl('primary_green.png'),
          label: '极简绿',
          value: 'green',
        },              {
          img: imageUrl('primary_black.png'),
          label: '极简黑白',
          value: 'black',
        },
      ]}
      unoptimized={false}
      width={250}
    />
  );
});

export default Theme;
