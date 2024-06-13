'use client';

import { ConfigProvider, NeutralColors, PrimaryColors, ThemeProvider  } from '@lobehub/ui';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ThemeAppearance, createStyles, useAntdToken } from 'antd-style';
import 'antd/dist/reset.css';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, memo, useEffect } from 'react';

import AntdStaticMethods from '@/components/AntdStaticMethods';
import {
  CustomTokenMap,
  LOBE_THEME_APPEARANCE,
  LOBE_THEME_PRIMARY_COLOR,
} from '@/const/theme';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';
import { GlobalStyle } from '@/styles';
import { setCookie } from '@/utils/cookie';

const useStyles = createStyles(({ css, token }) => ({
  app: css`
    position: relative;

    overscroll-behavior: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    min-height: 100dvh;
    max-height: 100dvh;

    @media (min-device-width: 576px) {
      overflow: hidden;
    }
  `,
  bg: css`
    position: relative;

    overflow-y: hidden;
    overscroll-behavior: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    max-height: 100dvh !important;

    background: ${token.colorBgLayout};
  `,
  // scrollbar-width and scrollbar-color are supported from Chrome 121
  // https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
  scrollbar: css`
    scrollbar-color: ${token.colorFill} transparent;
    scrollbar-width: thin;
  `,

  // so this is a polyfill for older browsers
  scrollbarPolyfill: css`
    ::-webkit-scrollbar {
      width: 0.75em;
      height: 0.75em;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }

    :hover::-webkit-scrollbar-thumb {
      background-color: ${token.colorText};
      background-clip: content-box;
      border: 3px solid transparent;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `,
}));

export interface AppThemeProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
  defaultNeutralColor?: NeutralColors;
  defaultPrimaryColor?: PrimaryColors;
}

const AppTheme = memo<AppThemeProps>(
  ({ children, defaultAppearance }) => {
    const themeMode = useUserStore((s) => settingsSelectors.currentSettings(s).themeMode);
    const { styles, cx } = useStyles();
    const [primaryColor] = useUserStore((s) => [
      settingsSelectors.currentSettings(s).primaryColor
    ]);

    useEffect(() => {
      setCookie(LOBE_THEME_PRIMARY_COLOR, primaryColor);
    }, [primaryColor]);

    const token = useAntdToken()


    return (
      <ThemeProvider
        className={cx(styles.app, styles.scrollbar, styles.scrollbarPolyfill)}
        customToken={() => {
          return {
            ...CustomTokenMap[primaryColor!],
          }
        }}
        defaultAppearance={defaultAppearance}
        onAppearanceChange={(appearance) => {
          setCookie(LOBE_THEME_APPEARANCE, appearance);
        }}
        themeMode={themeMode}
      >
        <GlobalStyle />
        <AntdStaticMethods />
        <AntdConfigProvider
          theme={{
            components: {
              Button: CustomTokenMap[primaryColor!],
              Checkbox: CustomTokenMap[primaryColor!]
            },
            token: CustomTokenMap[primaryColor!]
          }}
        >
          <ConfigProvider
            config={{ aAs: Link, imgAs: Image, imgUnoptimized: true }}>
            {children}
          </ConfigProvider>
        </AntdConfigProvider>
      </ThemeProvider>
    );
  },
);

export default AppTheme;
