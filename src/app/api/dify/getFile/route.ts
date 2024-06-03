import {NextRequest} from 'next/server'
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";
import {chatClient} from "../clients";

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { document_id } = body;

  return chatClient.getFile(document_id).then((resp) => {
    if (resp?.status === 200 && resp?.statusText === 'OK') {
      const headers = new Headers(resp.headers)
      return new Response(new Blob([resp.data], { type: headers.get('Content-Type')!}), { headers: headers, status: 200})
    }

    return  createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}
