import { DifyRawApp } from "@/libs/difyClient";
import { chatClient } from "@/app/api/dify/clients";
import { createSuccessResponse } from "@/app/api/successResponse";
import { createErrorResponse } from "@/app/api/errorResponse";
import { ChatErrorType } from "@/types/fetch";

export const runtime = 'nodejs';

const MockAppDatasets = [{ "app_count": 0, "created_at": 1_714_982_464, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": "useful for when you want to answer queries about the 复盘.docx", "document_count": 1, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "e09457db-af9b-41f7-aeba-17a986869e22", "indexing_technique": "high_quality", "name": "复盘.docx...", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": null, "reranking_provider_name": null }, "score_threshold": 0.5, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 3 }, "tags": [], "updated_at": 1_714_982_464, "updated_by": null, "word_count": 937 }, { "app_count": 0, "created_at": 1_714_982_440, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": "useful for when you want to answer queries about the 41 20231015适合普通人的龙头模式 (1).docx", "document_count": 1, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "39a63181-2d8b-4a9c-a6c0-886fcd82ad29", "indexing_technique": "high_quality", "name": "41 20231015适合普通人的龙...", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": null, "reranking_provider_name": null }, "score_threshold": 0.5, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 3 }, "tags": [], "updated_at": 1_714_982_440, "updated_by": null, "word_count": 4004 }, { "app_count": 1, "created_at": 1_713_249_775, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": null, "document_count": 2, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "496c5374-2b4c-4fa3-a2ac-2c397629bcf1", "indexing_technique": "high_quality", "name": "task", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": "", "reranking_provider_name": "" }, "score_threshold": null, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 2 }, "tags": [], "updated_at": 1_713_249_775, "updated_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "word_count": 7110 }];
const MockAppDatasets2 = [{ "app_count": 0, "created_at": 1_714_982_464, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": "useful for when you want to answer queries about the 复盘.docx", "document_count": 1, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "e09457db-af9b-41f7-aeba-17a986869e22", "indexing_technique": "high_quality", "name": "22复盘.docx...", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": null, "reranking_provider_name": null }, "score_threshold": 0.5, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 3 }, "tags": [], "updated_at": 1_714_982_464, "updated_by": null, "word_count": 937 }, { "app_count": 0, "created_at": 1_714_982_440, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": "useful for when you want to answer queries about the 41 20231015适合普通人的龙头模式 (1).docx", "document_count": 1, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "39a63181-2d8b-4a9c-a6c0-886fcd82ad29", "indexing_technique": "high_quality", "name": "41 20231015适合普通人的龙...", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": null, "reranking_provider_name": null }, "score_threshold": 0.5, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 3 }, "tags": [], "updated_at": 1_714_982_440, "updated_by": null, "word_count": 4004 }, { "app_count": 1, "created_at": 1_713_249_775, "created_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "data_source_type": "upload_file", "description": null, "document_count": 2, "embedding_available": true, "embedding_model": "text-embedding-3-large", "embedding_model_provider": "openai", "id": "496c5374-2b4c-4fa3-a2ac-2c397629bcf1", "indexing_technique": "high_quality", "name": "task", "permission": "only_me", "provider": "vendor", "retrieval_model_dict": { "reranking_enable": false, "reranking_model": { "reranking_model_name": "", "reranking_provider_name": "" }, "score_threshold": null, "score_threshold_enabled": false, "search_method": "semantic_search", "top_k": 2 }, "tags": [], "updated_at": 1_713_249_775, "updated_by": "81bd91fb-2dcf-4005-ac69-4414da8e5916", "word_count": 7110 }];

const MockApps = [{
  appId: 'chat',
  appKey: '',
  datasets: MockAppDatasets,
  icon: '🤖',
  name: '聊天助手',
}, {
  appId: 'workflow',
  appKey: '',
  datasets: MockAppDatasets2,
  icon: '📋',
  name: '工作流规划助手',
}];

export const getMockDifyAppsData = async () => {
  return createSuccessResponse(MockApps);
};

export async function GET() {
  // if (process.env.NODE_ENV === 'development') {
  //   return getMockDifyAppsData();
  // }

  return chatClient.getApps().then((resp) => {
    if (resp?.data) {
      const data = resp.data.map((item: DifyRawApp) => {
        const datasets = item?.datasets || [];

        return {
          appId: item.id,
          appKey: item.token || '',
          datasets: datasets.map((item) => {
            return {
              id: item[0],
              name: item[1],
            }
          }),
          icon: item?.icon || '🤖',
          name: item.name,
          opening_statement: item.opening_statement
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
