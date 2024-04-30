import {sessionSelectors} from "@/store/session/selectors";
import {SessionStore} from "@/store/session";

const currentSessionConversationId = (s: SessionStore) => sessionSelectors.currentSession(s)?.conversation_id || '';

export const sessionDifySelectors = {
  currentSessionConversationId,
}
