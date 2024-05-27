import axios from "axios";
import {getServerConfig} from "@/config/server";

export const BASE_URL = "https://api.dify.ai/v1";

const {DIFY_FEEDBACK_API_KEY} = getServerConfig()

export const routes = {
    application: {
        method: "GET",
        url: () => `/parameters`,
    },
    createChatMessage: {
        method: "POST",
        url: () => process.env.NODE_ENV === 'development' ? '/chat-messages' : `/chat-homology-messages`,
    },
    createCompletionMessage: {
        method: "POST",
        url: () => `/completion-messages`,
    },
    deleteConversation: {
        method: "DELETE",
        url: (conversation_id) => `/conversations/${conversation_id}`,
    },
    feedback: {
        method: "POST",
        url: (message_id) => `/messages/${message_id}/feedbacks`,
    },
    fileUpload: {
        method: "POST",
        url: () => `/files/upload`,
    },
    getApps: {
        method: "GET",
        url: () => `/apps`,
    },
    getConversationMessages: {
        method: "GET",
        url: () => `/messages`,
    },
    getConversationName: {
        method: "GET",
        url: (conversation_id, user) => `/conversations/${conversation_id}/get_name?user=${user}`,
    },
    getConversations: {
        method: "GET",
        url: () => `/conversations`,
    },
    getDatasets: {
        method: "GET",
        url: () => `/datasets`,
    },
    renameConversation: {
        method: "POST",
        url: (conversation_id) => `/conversations/${conversation_id}/name`,
    },
    runWorkflow: {
        method: "POST",
        url: () => `/workflows/run`,
    },
    upload: {
        method: "GET",
        url: () => `/files/upload`,
    },
};

export class DifyClient {
    constructor(apiKey, baseUrl = BASE_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    updateApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async sendRequest(
        method,
        endpoint,
        data = null,
        params = null,
        stream = false,
        headerParams = {}
    ) {
        const headers = {

                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json"
            ,
            ...headerParams
        };

        const url = `${this.baseUrl}${endpoint}`;
        let response;
        if (stream) {
            response = await axios({
                data,
                headers,
                method,
                params,
                responseType: "stream",
                url,
            });
        } else {
            response = await axios({
                data,
                headers,
                method,
                params,
                responseType: "json",
                url,
            });
        }

        return response;
    }

    messageFeedback(message_id, rating, user) {
        const data = {
            rating,
            user,
        };
        return this.sendRequest(
            routes.feedback.method,
            routes.feedback.url(message_id),
            data,
            null,
            false,
            {
              Authorization: `Bearer ${DIFY_FEEDBACK_API_KEY || ''}`,
            }
        );
    }

    getApplicationParameters(user) {
        const params = { user };
        return this.sendRequest(
            routes.application.method,
            routes.application.url(),
            null,
            params
        );
    }

    fileUpload(data) {
        return this.sendRequest(
            routes.fileUpload.method,
            routes.fileUpload.url(),
            data,
            null,
            false,
            {
                "Content-Type": 'multipart/form-data'
            }
        );
    }
}

export class CompletionClient extends DifyClient {
    createCompletionMessage(inputs, user, stream = false, files = null) {
        const data = {
            files,
            inputs,
            response_mode: stream ? "streaming" : "blocking",
            user,
        };
        return this.sendRequest(
            routes.createCompletionMessage.method,
            routes.createCompletionMessage.url(),
            data,
            null,
            stream
        );
    }

    runWorkflow(inputs, user, stream = false, files = null) {
        const data = {
            inputs,
            response_mode: stream ? "streaming" : "blocking",
            user,
        };
        return this.sendRequest(
            routes.runWorkflow.method,
            routes.runWorkflow.url(),
            data,
            null,
            stream
        );
    }
}

export class ChatClient extends DifyClient {
    createChatMessage(
        config
    ) {
        const {
            inputs,
            query,
            user,
            stream = false,
            conversation_id = null,
            files = null,
            dataset_ids = [],
        } = config;

        const data = {
            dataset_ids,
            files,
            inputs,
            query,
            response_mode: stream ? "streaming" : "blocking",
            user,
        };
        if (conversation_id) data.conversation_id = conversation_id;

        return this.sendRequest(
            routes.createChatMessage.method,
            routes.createChatMessage.url(),
            data,
            null,
            stream
        );
    }

    getConversationMessages(
        user,
        conversation_id = "",
        first_id = null,
        limit = null
    ) {
        const params = { user };

        if (conversation_id) params.conversation_id = conversation_id;

        if (first_id) params.first_id = first_id;

        if (limit) params.limit = limit;

        return this.sendRequest(
            routes.getConversationMessages.method,
            routes.getConversationMessages.url(),
            null,
            params
        );
    }

    getConversations(user, first_id = null, limit = null, pinned = null) {
        const params = { first_id: first_id, limit, pinned, user };
        return this.sendRequest(
            routes.getConversations.method,
            routes.getConversations.url(),
            null,
            params
        );
    }

    renameConversation(conversation_id, name, user, auto_generate) {
        const data = { auto_generate, name, user };
        return this.sendRequest(
            routes.renameConversation.method,
            routes.renameConversation.url(conversation_id),
            data
        );
    }

    getConversationName(conversation_id, user) {
        const data = {};
        return this.sendRequest(
            routes.getConversationName.method,
            routes.getConversationName.url(conversation_id, user),
            data
        );
    }

    deleteConversation(conversation_id, user) {
        const data = { user };
        return this.sendRequest(
            routes.deleteConversation.method,
            routes.deleteConversation.url(conversation_id),
            data
        );
    }

    getApps() {
        return this.sendRequest(
            routes.getApps.method,
            routes.getApps.url(),
        );
    }
}

export class DatasetsClient extends DifyClient {
    getDatasets(params) {
        return this.sendRequest(
            routes.getDatasets.method,
            routes.getDatasets.url(),
            null,
            params,
        );
    }
}

export class FileClient extends DifyClient {
    upload(params) {
        const formData = new FormData();
        formData.append('user', params.user); // 添加键值对
        formData.append('file', params.file); // 添加文件，其中 `file` 是一个 File 对象

        return this.sendRequest(
            routes.upload.method,
            routes.upload.url(),
            formData,
            null,
            false,
            {
                "Content-Type": "multipart/form-data",
            }
        );
    }
}
