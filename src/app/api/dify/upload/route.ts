import { createErrorResponse } from "@/app/api/errorResponse";
import { ChatErrorType } from "@/types/fetch";
import { ChatCompletionErrorPayload } from "@/libs/agent-runtime";
import { uploadClient } from '../clients';
import { createSuccessResponse } from "../../successResponse";

export const runtime = 'nodejs';
export async function POST(req: Request) {

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const appToken = formData.get("appToken") as string;

    return uploadClient.upload({ file, appToken, user: userId, }).then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return createSuccessResponse(resp.data)
      }
      return createErrorResponse(ChatErrorType.InternalServerError, resp?.data)
    })

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
