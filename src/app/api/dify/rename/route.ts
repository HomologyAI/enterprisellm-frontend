import {NextRequest} from 'next/server'
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {AgentRuntimeErrorType} from "@/libs/agent-runtime";
import {chatClient} from "../clients";
import {createSuccessResponse} from "@/app/api/successResponse";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    conversation_id = '',
    userId = '',
    name = '',
    app,
  } = body;

  if (!conversation_id || !userId || !name || !app) {
    return createErrorResponse(ChatErrorType.InternalServerError, body);
  }

  if (app?.apiKey) {
    chatClient.updateApiKey(app.apiKey);
  }

  return chatClient.renameConversation(
    conversation_id,
    name,
    userId,
  ).then((resp) => {
    if (resp?.data?.status === 'normal') {
      return createSuccessResponse();
    }
    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error?.response?.data);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
