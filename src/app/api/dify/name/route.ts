import { NextRequest, NextResponse } from 'next/server'
import { createErrorResponse } from "@/app/api/errorResponse";
import { ChatErrorType } from "@/types/fetch";
import { AgentRuntimeErrorType } from "@/libs/agent-runtime";
import { chatClient } from "../clients";
import { createSuccessResponse } from "@/app/api/successResponse";

export const runtime = 'nodejs';

// {
//   "id": "f04b2bd7-215e-4c35-9180-e262159d75b0",
//   "name": "\u8be2\u95ee\u6211\u7684\u529f\u80fd",
//   "inputs": {},
//   "status": "normal",
//   "introduction": "",
//   "created_at": 1715317091
// }

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    conversation_id = '',
    userId = '',
    app,
  } = body;
  console.log(app)
  if (!conversation_id || !userId) {
    return createErrorResponse(ChatErrorType.InternalServerError, body);
  }

  if (app?.apiKey) {
    chatClient.updateApiKey(app.apiKey);
  }

  return chatClient.getConversationName(
    conversation_id,
    userId,
  ).then((resp) => {
    if (resp?.data?.status === 'normal') {
      return createSuccessResponse(resp.data);
    }
    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
