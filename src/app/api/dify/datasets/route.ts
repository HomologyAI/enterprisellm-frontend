import { NextResponse } from 'next/server'
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {ChatCompletionErrorPayload} from "@/libs/agent-runtime";
import {datasetsClient} from "../clients";

export const runtime = 'nodejs';

export async function GET() {
  return datasetsClient.getDatasets({
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
