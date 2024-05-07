import {sessionSelectors} from "@/store/session/selectors";
import {SessionStore} from "@/store/session";

const currentSessionConversationId = (s: SessionStore) => sessionSelectors.currentSession(s)?.conversation_id || '';
const currentDifyDatasets = (s: SessionStore) => sessionSelectors.currentSession(s)?.datasets || [];

export const sessionDifySelectors = {
  currentSessionConversationId,
  currentDifyDatasets,
}
