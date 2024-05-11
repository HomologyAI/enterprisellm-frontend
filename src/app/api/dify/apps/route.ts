import {NextRequest, NextResponse} from "next/server";

export const runtime = 'nodejs';

const MockApps = [{
  appId: 'chat',
  icon: '🤖',
  name: '聊天助手',
  appKey: '',
  datasetsAppKey: '',
}, {
  appId: 'workflow',
  icon: '📋',
  name: '工作流规划助手',
  appKey: '',
  datasetsAppKey: '',
}];

type RespAppData = {
  id: string;
  name: string;
  mode: string;
  icon: string,
  icon_background: string;
  token: string;
}

export const getDifyAppsData = async () => {

  return NextResponse.json(MockApps);
};

export async function GET(req: NextRequest) {
  return getDifyAppsData();
}

