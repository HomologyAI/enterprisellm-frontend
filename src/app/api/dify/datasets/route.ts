import {NextRequest, NextResponse} from 'next/server'
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {ChatCompletionErrorPayload} from "@/libs/agent-runtime";
import {datasetsClient} from "../clients";
import {createSuccessResponse} from "@/app/api/successResponse";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    app,
  } = body;

  if (app?.datasetsAppKey) {
    datasetsClient.updateApiKey(app.datasetsAppKey);
  }

  return datasetsClient.getDatasets({
    limit: 20,
    page: 1,
  }).then((resp) => {
    if (resp?.data) {
      return createSuccessResponse(resp.data);
    }
    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error?.response?.data);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
