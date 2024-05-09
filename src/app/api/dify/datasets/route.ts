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
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error?.response?.data);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
