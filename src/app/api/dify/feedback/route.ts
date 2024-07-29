import { createErrorResponse } from "@/app/api/errorResponse";
import { createSuccessResponse } from "@/app/api/successResponse";
import { chatClient } from '../clients'
import { NextRequest } from 'next/server'
import { ChatErrorType } from "@/types/fetch";

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log(body);
  const { userId = '', rating = '', messageId = '', app } = body
  const appToken = app.appKey;

  return chatClient.messageFeedback(messageId, rating, userId, appToken).then((resp) => {
    if (resp?.data?.result === 'success') {
      return createSuccessResponse(resp.data)
    }
    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data)
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  })
}
