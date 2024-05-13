import {NextRequest, NextResponse} from "next/server";
import {DifyDataset, DifyRawApp, GetAppResp} from "@/libs/difyClient";
import {chatClient} from "@/app/api/dify/clients";
import {createSuccessResponse} from "@/app/api/successResponse";
import {createErrorResponse} from "@/app/api/errorResponse";
import {ChatErrorType} from "@/types/fetch";

export const runtime = 'nodejs';

const MockAppDatasets = [{"id":"e09457db-af9b-41f7-aeba-17a986869e22","name":"复盘.docx...","description":"useful for when you want to answer queries about the 复盘.docx","provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":0,"document_count":1,"word_count":937,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1714982464,"updated_by":null,"updated_at":1714982464,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":null,"reranking_model_name":null},"top_k":3,"score_threshold_enabled":false,"score_threshold":0.5},"tags":[]},{"id":"39a63181-2d8b-4a9c-a6c0-886fcd82ad29","name":"41 20231015适合普通人的龙...","description":"useful for when you want to answer queries about the 41 20231015适合普通人的龙头模式 (1).docx","provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":0,"document_count":1,"word_count":4004,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1714982440,"updated_by":null,"updated_at":1714982440,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":null,"reranking_model_name":null},"top_k":3,"score_threshold_enabled":false,"score_threshold":0.5},"tags":[]},{"id":"496c5374-2b4c-4fa3-a2ac-2c397629bcf1","name":"task","description":null,"provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":1,"document_count":2,"word_count":7110,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1713249775,"updated_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","updated_at":1713249775,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":"","reranking_model_name":""},"top_k":2,"score_threshold_enabled":false,"score_threshold":null},"tags":[]}];
const MockAppDatasets2 = [{"id":"e09457db-af9b-41f7-aeba-17a986869e22","name":"22复盘.docx...","description":"useful for when you want to answer queries about the 复盘.docx","provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":0,"document_count":1,"word_count":937,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1714982464,"updated_by":null,"updated_at":1714982464,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":null,"reranking_model_name":null},"top_k":3,"score_threshold_enabled":false,"score_threshold":0.5},"tags":[]},{"id":"39a63181-2d8b-4a9c-a6c0-886fcd82ad29","name":"41 20231015适合普通人的龙...","description":"useful for when you want to answer queries about the 41 20231015适合普通人的龙头模式 (1).docx","provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":0,"document_count":1,"word_count":4004,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1714982440,"updated_by":null,"updated_at":1714982440,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":null,"reranking_model_name":null},"top_k":3,"score_threshold_enabled":false,"score_threshold":0.5},"tags":[]},{"id":"496c5374-2b4c-4fa3-a2ac-2c397629bcf1","name":"task","description":null,"provider":"vendor","permission":"only_me","data_source_type":"upload_file","indexing_technique":"high_quality","app_count":1,"document_count":2,"word_count":7110,"created_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","created_at":1713249775,"updated_by":"81bd91fb-2dcf-4005-ac69-4414da8e5916","updated_at":1713249775,"embedding_model":"text-embedding-3-large","embedding_model_provider":"openai","embedding_available":true,"retrieval_model_dict":{"search_method":"semantic_search","reranking_enable":false,"reranking_model":{"reranking_provider_name":"","reranking_model_name":""},"top_k":2,"score_threshold_enabled":false,"score_threshold":null},"tags":[]}];

const MockApps = [{
  appId: 'chat',
  icon: '🤖',
  name: '聊天助手',
  appKey: '',
  datasets: MockAppDatasets,
}, {
  appId: 'workflow',
  icon: '📋',
  name: '工作流规划助手',
  appKey: '',
  datasets: MockAppDatasets2,
}];

export const getMockDifyAppsData = async () => {
  return createSuccessResponse(MockApps);
};

export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    return getMockDifyAppsData();
  }

  return chatClient.getApps().then((resp) => {
    if (resp?.data) {
      const data = resp.data.map((item: DifyRawApp) => {
        return {
          appId: item.id,
          icon: item?.icon || '🤖',
          name: item.name,
          appKey: item.token || '',
          datasets: item?.datasets || [],
        }
      });
      return createSuccessResponse(data);
    }
    return createErrorResponse(ChatErrorType.InternalServerError, resp?.data);
  }).catch((error) => {
    console.error(`Route: ${'error'}:`, error?.response?.data);
    const errorData = error?.response?.data || {}
    const errorType = errorData?.status === 401 ? ChatErrorType.Unauthorized : ChatErrorType.InternalServerError;
    return createErrorResponse(errorType, errorData);
  });
}

