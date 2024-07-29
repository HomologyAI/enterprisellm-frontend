import { NextRequest, NextResponse } from 'next/server'
import { createErrorResponse } from "@/app/api/errorResponse";
import { ChatErrorType } from "@/types/fetch";
import { chatClient } from "../clients";

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { document_id } = body;

  const {
    app
  } = body;


  if (app?.appKey) {
    chatClient.updateApiKey(app.appKey);
  }

  return chatClient.getFile(document_id).then((resp) => {
    if (resp?.status === 200 && resp?.statusText === 'OK') {
      const headers = new Headers(resp.headers)
      return new NextResponse(resp.data, {
        headers,
        status: resp.status,
      });
    }

    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
