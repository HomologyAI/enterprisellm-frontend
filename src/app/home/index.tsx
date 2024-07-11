'use client';

import FullscreenLoading from '@/components/FullscreenLoading';
import config from '@/config/config.json';

const Loading = () => {

  return <FullscreenLoading title={config.companyName + "AI启动中，请稍等"} />;
};

export default Loading;
