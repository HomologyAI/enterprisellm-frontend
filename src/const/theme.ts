import { FullToken } from "antd-style";

export const LOBE_THEME_APPEARANCE = 'LOBE_THEME_APPEARANCE';

export const LOBE_THEME_PRIMARY_COLOR = 'LOBE_THEME_PRIMARY_COLOR';

export const LOBE_THEME_NEUTRAL_COLOR = 'LOBE_THEME_NEUTRAL_COLOR';

export enum CustomPrimaryColor {
  BLACK = 'black',
  BLUE = 'blue',
  COMMON = 'common',
  DARK = 'dark',
  GREEN = 'green',
  PURPLE = 'purple'
}

// 自定义颜色类型
export type CustomPrimaryModeType = 'common' | 'blue' | 'purple' | 'green' | 'black'
// 自定义颜色集合
export const CustomPrimaryModes: CustomPrimaryModeType[] = ['common', 'blue', 'purple', 'green', 'black']

export interface CustomTokenType extends Partial<FullToken> {
  appBgImage: string,
  colorAppBg: string,
  colorConversationItemActive: string,
  colorConversationItemCommon: string,
  colorConversationItemHover: string,
  colorPrimary: string // 应用背景中的颜色块
}

export const CustomTokenMap: {[k in CustomPrimaryModeType]: CustomTokenType} = {
  'black': {
    appBgImage: '/images/bg_black.svg',
    colorAppBg: 'rgba(249, 249, 249, 1)',
    colorConversationItemActive: 'rgba(38, 22, 63, 0.08)',
    colorConversationItemCommon: 'none',
    colorConversationItemHover: 'rgba(38, 22, 63, 0.05)',
    colorPrimary: 'rgba(0, 0, 0, 1)',
    colorPrimaryHover: 'rgba(24, 24, 42, 0.6)'
  },
  'blue': {
    appBgImage: '/images/bg_blue.svg',
    colorAppBg: 'rgba(234,237,245,1)',
    colorConversationItemActive: 'rgba(234, 240, 255, 1)',
    colorConversationItemCommon: 'none',
    colorConversationItemHover: 'rgba(38, 22, 63, 0.05)',
    colorPrimary: 'rgba(43, 101, 246, 1)',
    colorPrimaryHover: 'rgba(54, 110, 255, 0.6)',
  },
  'common': {
    appBgImage: '/images/bg_common.svg',
    colorAppBg: 'rgba(234,234,245,1)',
    colorConversationItemActive: 'rgba(191, 189, 249, 1)',
    colorConversationItemCommon: 'none',
    colorConversationItemHover: 'rgba(38, 22, 63, 0.05)',
    colorPrimary: 'rgba(191, 189, 249, 1)',
    colorPrimaryActive: 'rgba(191, 189, 249, 1)',
    colorPrimaryHover: 'rgba(108, 71, 255, 0.6)'
  },
  'green': {
    appBgImage: '/images/bg_green.svg',
    colorAppBg: 'rgba(249, 249, 249, 1)',
    colorConversationItemActive: 'rgba(234, 240, 255, 1)',
    colorConversationItemCommon: 'none',
    colorConversationItemHover: 'rgba(38, 22, 63, 0.05)',
    colorPrimary: 'rgba(22, 161, 128, 1)',
    colorPrimaryHover: 'rgba(22, 161, 128, 0.6)',
  },
  'purple': {
    appBgImage: '/images/bg_purple.svg',
    colorAppBg: 'rgba(242, 232, 255, 1)',
    colorConversationItemActive: 'rgba(151, 71, 255, 0.1)',
    colorConversationItemCommon: 'none',
    colorConversationItemHover: 'rgba(38, 22, 63, 0.05)',
    colorPrimary: 'rgba(151, 71, 255, 1)',
    colorPrimaryHover: 'rgba(151, 71, 255, 0.6)',
  },
}
