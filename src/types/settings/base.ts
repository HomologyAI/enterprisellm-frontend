import type { NeutralColors } from '@lobehub/ui';
import type { ThemeMode } from 'antd-style';

import { LocaleMode } from '@/types/locale';
import { CustomPrimaryModeType } from '@/const/theme';

export interface GlobalBaseSettings {
  fontSize: number;
  language: LocaleMode;
  neutralColor?: NeutralColors;
  password: string;
  primaryColor?: CustomPrimaryModeType;
  themeMode: ThemeMode;
}
