import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {DatasetsClient, FileClient} from "@/libs/difyClient";
import {getServerConfig} from "@/config/server";
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {ChatCompletionErrorPayload} from "@/libs/agent-runtime";

export const runtime = 'nodejs';
export async function POST(req: Request) {
  const { BACK_END_URL, DIFY_CHAT_API_KEY } = getServerConfig();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // const resp = await client.upload({
    //   user: '',
    //   file,
    // });

    return NextResponse.json({
      "id": "0273b99d-d7c0-4358-8526-3ed15fec195c",
      "name": "\u673a\u5668\u4eba-\u7efc\u5408\u76d1\u63a7\u5ba4.pdf",
      "size": 6230938,
      "extension": "pdf",
      "mime_type": "application/pdf",
      "created_by": "c7f3d235-2ad0-4baf-9c15-d9241cd43ff3",
      "created_at": 1715052495
    });
  } catch (err) {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = err as ChatCompletionErrorPayload;

    const error = errorContent || err;
    // track the error at server side
    console.error(`Route: ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res });
  }
}
