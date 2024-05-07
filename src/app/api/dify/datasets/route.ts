import { NextResponse } from 'next/server'
import {DatasetsClient} from "@/libs/difyClient";
import {getServerConfig} from "@/config/server";
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {ChatCompletionErrorPayload} from "@/libs/agent-runtime";

export const runtime = 'nodejs';
export async function GET() {
  const { DIFY_PROXY_URL, DIFY_DATASETS_API_KEY } = getServerConfig();

  const client = new DatasetsClient(DIFY_DATASETS_API_KEY, DIFY_PROXY_URL);

  await client.getDatasets({
    limit: 20,
    page: 1,
  }).then((resp) => {
    return NextResponse.json(resp.data);
  }).catch((err) => {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = err as ChatCompletionErrorPayload;

    const error = errorContent || err;
    // track the error at server side
    console.error(`Route: ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res });
  });
}
