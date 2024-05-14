import {sessionSelectors} from "@/store/session/selectors";
import {SessionStore} from "@/store/session";

const currentSessionConversationId = (s: SessionStore) => sessionSelectors.currentSession(s)?.conversation_id || '';
const currentDifyDatasets = (s: SessionStore) => sessionSelectors.currentSession(s)?.datasets || [];
const currentSessionFiles = (s: SessionStore) => {
  return sessionSelectors.currentSession(s)?.files || []
  // return s.localUploadFiles[s.activeId] || [];
};

export const sessionDifySelectors = {
  currentSessionConversationId,
  currentDifyDatasets,
  currentSessionFiles,
}
