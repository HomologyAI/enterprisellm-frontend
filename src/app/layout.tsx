import { SpeedInsights } from '@vercel/speed-insights/next';
import { ResolvingViewport } from 'next';
import { cookies } from 'next/headers';
import {PropsWithChildren, useEffect, useState} from 'react';
import { isRtlLang } from 'rtl-detect';

import Analytics from '@/components/Analytics';
import { DEFAULT_LANG, LOBE_LOCALE_COOKIE } from '@/const/locale';
import AuthProvider from '@/layout/AuthProvider';
import GlobalProvider from '@/layout/GlobalProvider';
import LayoutRoutes from '@/layout/routes';
import { isMobileDevice } from '@/utils/responsive';
import {getDifyAppsData} from "@/app/api/dify/apps/route";
import FullscreenLoading from "@/components/FullscreenLoading";
import useSWR from "swr";
import {API_ENDPOINTS} from "@/services/_url";
import AppsProvider from "@/layout/GlobalProvider/AppsProvider";

async function getApps() {
  const result = await getDifyAppsData();
  const data = await result.json();
  console.log('result', data);
  return data;
}

const RootLayout = async ({ children }: PropsWithChildren) => {
  const cookieStore = cookies();

  const lang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const direction = isRtlLang(lang?.value || DEFAULT_LANG) ? 'rtl' : 'ltr';

  return (
    <html dir={direction} lang={lang?.value || DEFAULT_LANG} suppressHydrationWarning>
      <body>
        <GlobalProvider>
          <AuthProvider>
            <LayoutRoutes>{children}</LayoutRoutes>
          </AuthProvider>
        </GlobalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;

export { default as metadata } from './metadata';

export const generateViewport = async (): ResolvingViewport => {
  const isMobile = isMobileDevice();

  const dynamicScale = isMobile ? { maximumScale: 1, userScalable: false } : {};

  return {
    ...dynamicScale,
    initialScale: 1,
    minimumScale: 1,
    themeColor: [
      { color: '#f8f8f8', media: '(prefers-color-scheme: light)' },
      { color: '#000', media: '(prefers-color-scheme: dark)' },
    ],
    viewportFit: 'cover',
    width: 'device-width',
  };
};
