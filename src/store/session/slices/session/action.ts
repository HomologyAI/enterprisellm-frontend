import { t } from 'i18next';
import { isEqual } from 'lodash-es';
import useSWR, { SWRResponse, mutate } from 'swr';
import { DeepPartial } from 'utility-types';
import { StateCreator } from 'zustand/vanilla';

import { message } from '@/components/AntdStaticMethods';
import { DEFAULT_AGENT_LOBE_SESSION, INBOX_SESSION_ID } from '@/const/session';
import { useClientDataSWR } from '@/libs/swr';
import { sessionService } from '@/services/session';
import {difyService} from '@/services/dify';
import {SessionStore} from '@/store/session';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';
import {DatasetsData, FilesData, MetaData} from '@/types/meta';
import {
  ChatSessionList,
  LobeAgentSession,
  LobeSessionGroups,
  LobeSessionType,
  LobeSessions,
  SessionGroupId, LocalUploadFile,
} from '@/types/session';
import { merge } from '@/utils/merge';
import { setNamespace } from '@/utils/storeDebug';

import { SessionDispatch, sessionsReducer } from './reducers';
import { sessionSelectors } from './selectors';
import { sessionMetaSelectors } from './selectors/meta';
import {DifyDataset, GetDatasetsResp} from "@/libs/difyClient";
import {API_ENDPOINTS} from "@/services/_url";
import {useChatStore} from "@/store/chat";
import {UploadFile} from "antd/es/upload/interface";
import {appsSelectors, useAppsStore} from "@/store/apps";
import {DifyApp} from "@/types/dify";

const n = setNamespace('session');

const FETCH_SESSIONS_KEY = 'fetchSessions';
const SEARCH_SESSIONS_KEY = 'searchSessions';

/* eslint-disable typescript-sort-keys/interface */
export interface SessionAction {
  /**
   * active the session
   * @param sessionId
   */
  activeSession: (sessionId: string) => void;
  initSessions: (queryId: string) => void;
  updateQueryId: (queryId: string) => void;
  activeFirstSession: () => void;
  /**
   * reset sessions to default
   */
  clearSessions: () => Promise<void>;
  /**
   * create a new session
   * @param agent
   * @returns sessionId
   */
  createSession: (
    session?: DeepPartial<LobeAgentSession>,
    isSwitchSession?: boolean,
  ) => Promise<string>;
  duplicateSession: (id: string) => Promise<void>;
  updateSessionGroupId: (sessionId: string, groupId: string) => Promise<void>;
  updateSessionMeta: (meta: Partial<MetaData>) => void;
  updateSessionDatasets: (data: Partial<DatasetsData>) => void;
  updateSessionFiles: (data: LocalUploadFile[]) => void;
  deleteSessionFile: (uid: string) => void;
  /**
   * Pins or unpins a session.
   */
  pinSession: (id: string, pinned: boolean) => Promise<void>;
  /**
   * re-fetch the data
   */
  refreshSessions: () => Promise<void>;
  /**
   * remove session
   * @param id - sessionId
   */
  removeSession: (id: string) => Promise<void>;

  updateSearchKeywords: (keywords: string) => void;

  useFetchSessions: (params: {userId: string}) => SWRResponse<ChatSessionList>;
  useSearchSessions: (keyword?: string) => SWRResponse<any>;

  internal_dispatchSessions: (payload: SessionDispatch) => void;
  internal_updateSession: (
    id: string,
    data: Partial<{
      group?: SessionGroupId; meta?: any; pinned?: boolean,
      files?: FilesData,
    }>,
  ) => Promise<void>;
  internal_processSessions: (
    sessions: LobeSessions,
    customGroups: LobeSessionGroups,
    actions?: string,
  ) => void;
  /* eslint-enable */
  useFetchDatasets: () => SWRResponse<DatasetsData[]>;
  renameConversation: (name: string) => Promise<boolean>;
}

const addDifyDatasetsMessage = (id: string) => useChatStore.getState().addDifyDatasetsMessage(id);

const getUserId = () => useUserStore.getState().userId || '';
const getAppId = () => useAppsStore.getState().activeId;
const getApp = () => appsSelectors.currentApp(useAppsStore.getState());

export const createSessionSlice: StateCreator<
  SessionStore,
  [['zustand/devtools', never]],
  [],
  SessionAction
> = (set, get) => ({
  renameConversation: async (name) => {
    const session = sessionSelectors.currentSession(get());
    if (!session?.conversation_id) return false;

    const {
      userId = '',
      conversation_id = '',
    } = session;

    const app = getApp();

    const result = await difyService.renameConversation({
      app,
      data: {
        conversation_id,
        userId,
        name,
      },
    });

    if (result) {
      // 修改session.title
      const meta: MetaData = {
        ...session.meta,
        title: name,
      }

      const { activeId, refreshSessions } = get();
      await sessionService.updateSession(activeId, { meta });
      await refreshSessions();
    }

    return result;
  },
  activeFirstSession: () => {
    const { sessions, activeId } = get();
    if (!sessions.length) {
      return;
    }

    const firstSession = sessions[0];
    if (firstSession.id === activeId) {
      return;
    }

    set({ activeId: firstSession.id }, false, n(`activeSession/${firstSession.id}`));
  },
  activeSession: (sessionId) => {
    if (get().activeId === sessionId) return;

    set({ activeId: sessionId }, false, n(`activeSession/${sessionId}`));
  },
  clearSessions: async () => {
    await sessionService.removeAllSessions();
    await get().refreshSessions();
  },

  createSession: async (agent, isSwitchSession = true) => {
    const { activeSession, refreshSessions } = get();

    // merge the defaultAgent in settings
    const defaultAgent = merge(
      DEFAULT_AGENT_LOBE_SESSION,
      settingsSelectors.defaultAgent(useUserStore.getState()),
    );

    const currentUserId = getUserId();
    const currentAppId = getAppId();

    // 创建一个新的session
    let newSession: LobeAgentSession = merge(defaultAgent, agent);

    newSession = {
      ...newSession,
      userId: currentUserId,
      appId: currentAppId,
    }

    console.log('newSession', currentUserId, currentAppId, newSession);

    const id = await sessionService.createSession(LobeSessionType.Agent, newSession);
    await refreshSessions();

    // Whether to goto  to the new session after creation, the default is to switch to
    if (isSwitchSession)
      await activeSession(id);

    // // 创建一条新的数据集消息
    await addDifyDatasetsMessage(id);

    return id;
  },
  duplicateSession: async (id) => {
    const { activeSession, refreshSessions } = get();
    const session = sessionSelectors.getSessionById(id)(get());

    if (!session) return;
    const title = sessionMetaSelectors.getTitle(session.meta);

    const newTitle = t('duplicateSession.title', { ns: 'chat', title: title });

    const messageLoadingKey = 'duplicateSession.loading';

    message.loading({
      content: t('duplicateSession.loading', { ns: 'chat' }),
      duration: 0,
      key: messageLoadingKey,
    });

    const newId = await sessionService.cloneSession(id, newTitle);

    // duplicate Session Error
    if (!newId) {
      message.destroy(messageLoadingKey);
      message.error(t('copyFail', { ns: 'common' }));
      return;
    }

    await refreshSessions();
    message.destroy(messageLoadingKey);
    message.success(t('duplicateSession.success', { ns: 'chat' }));

    activeSession(newId);
  },

  pinSession: async (id, pinned) => {
    await get().internal_updateSession(id, { pinned });
  },

  removeSession: async (sessionId) => {
    await sessionService.removeSession(sessionId);
    await get().refreshSessions();

    // If the active session deleted, switch to the inbox session
    if (sessionId === get().activeId) {
      get().activeSession(INBOX_SESSION_ID);
    }
  },

  updateSearchKeywords: (keywords) => {
    set(
      { isSearching: !!keywords, sessionSearchKeywords: keywords },
      false,
      n('updateSearchKeywords'),
    );
  },
  updateSessionGroupId: async (sessionId, group) => {
    await get().internal_updateSession(sessionId, { group });
  },

  updateSessionMeta: async (meta) => {
    const session = sessionSelectors.currentSession(get());
    if (!session) return;

    const { activeId, refreshSessions } = get();

    await sessionService.updateSession(activeId, { meta });
    await refreshSessions();
  },
  useFetchSessions: ({userId, appId, onSuccess}) =>
    useClientDataSWR<ChatSessionList>([FETCH_SESSIONS_KEY, userId, appId], ([, userId, appId]) => {
      return sessionService.getGroupedSessions(userId, appId);
    }, {
      onSuccess: (data) => {
        if (
          get().isSessionsFirstFetchFinished &&
          isEqual(get().sessions, data.sessions) &&
          isEqual(get().sessionGroups, data.sessionGroups)
        )
          return;

        get().internal_processSessions(
          data.sessions,
          data.sessionGroups,
          n('useFetchSessions/updateData') as any,
        );
        //
        console.log('useFetchSessions', get().querySessionId);

        const queryId = get().querySessionId;
        // if (queryId === INBOX_SESSION_ID) {
        //   set({ activeId: data.sessions[0].id }, false);
        // } else {
        //   if (data.sessions.find((s) => s.id === queryId)) {
        //     set({ activeId: queryId }, false);
        //   } else {
        //     set({ activeId: data.sessions[0].id }, false);
        //   }
        // }
        const sessions = data.sessions;

        if (sessions.length) {
          if (data.sessions.find((s) => s.id === queryId)) {
            set({ activeId: queryId }, false);
          } else {
            set({ activeId: data.sessions[0].id }, false);
          }
        }

        set({ isSessionsFirstFetchFinished: true }, false, n('useFetchSessions/onSuccess', data));
      },
    }),
  useSearchSessions: (keyword) =>
    useSWR<LobeSessions>(
      [SEARCH_SESSIONS_KEY, keyword],
      async () => {
        if (!keyword) return [];

        return sessionService.searchSessions(keyword);
      },
      { revalidateOnFocus: false, revalidateOnMount: false },
    ),

  /* eslint-disable sort-keys-fix/sort-keys-fix */
  internal_dispatchSessions: (payload) => {
    const nextSessions = sessionsReducer(get().sessions, payload);
    get().internal_processSessions(nextSessions, get().sessionGroups);
  },
  internal_updateSession: async (id, data) => {
    get().internal_dispatchSessions({ type: 'updateSession', id, value: data });

    await sessionService.updateSession(id, data);
    await get().refreshSessions();
  },
  internal_processSessions: (sessions, sessionGroups) => {
    const customGroups = sessionGroups.map((item) => ({
      ...item,
      children: sessions.filter((i) => i.group === item.id && !i.pinned),
    }));

    const defaultGroup = sessions.filter(
      (item) => (!item.group || item.group === 'default') && !item.pinned,
    );
    const pinnedGroup = sessions.filter((item) => item.pinned);

    set(
      {
        customSessionGroups: customGroups,
        defaultSessions: defaultGroup,
        pinnedSessions: pinnedGroup,
        sessionGroups,
        sessions,
      },
      false,
      n('processSessions'),
    );
  },
  refreshSessions: async () => {
    const currentUserId = getUserId();
    const currentAppId = getAppId();
    await mutate([FETCH_SESSIONS_KEY, currentUserId, currentAppId]);
  },
  updateSessionDatasets: async (datasets) => {
    const session = sessionSelectors.currentSession(get());
    if (!session) return;

    const { activeId, refreshSessions } = get();

    await sessionService.updateSession(activeId, { datasets });
    await refreshSessions();
  },
  deleteSessionFile: async (uid: string) => {
    const session = sessionSelectors.currentSession(get());
    const { activeId, internal_updateSession } = get();
    if (!session) return;

    const currentFileList = session?.files;

    if (currentFileList?.length) {
      const newFileList = currentFileList.filter((item) => item.localId !== uid);
      await internal_updateSession(activeId, { files: newFileList });
    }
  },
  updateSessionFiles: async (fileList) => {
    const session = sessionSelectors.currentSession(get());
    if (!session) return;
    const { internal_updateSession, activeId,  } = get();

    const oldFileList = session?.files || [];
    const newFileList = fileList.map((uploadFile) => {
      const { uid, status, size, name, type, percent, originFileObj} = uploadFile;

      return {
        status,
        name,
        size,
        type,
        percent,
        localId: uid,
        id: uploadFile?.response?.id,
        extension: uploadFile?.response?.extension,
      }
    }) as FilesData;
    const newIds = newFileList.map((v) => v.localId);

    const mergeList = [...newFileList, ...oldFileList.filter((item) => !newIds.includes(item.localId))];
    await internal_updateSession(activeId, { files: mergeList });
    // set({ localUploadFiles: { ...localUploadFiles, [activeId]: fileList } }, false, n('updateSessionFiles'));
  },
  useFetchDatasets: () => {
    const {updateSessionDatasets} = get();
    const session = sessionSelectors.currentSession(get());
    const app = getApp();

    return useClientDataSWR(
      'fetchDifyDatasets',
      () => difyService.getDatasets({ app }),
      {
        onSuccess: (resp: GetDatasetsResp) => {
        console.log('resp', JSON.stringify(resp.data));

        if (!session?.datasets && resp?.data) {
          updateSessionDatasets(resp.data);
        }
      }
    });
  },
  initSessions: async (queryId: string) => {
    const { activeId, sessions, } = get();
    const session = sessionSelectors.currentSession(get());
    console.log('initSessions', sessions, activeId);

    if (queryId === INBOX_SESSION_ID) {

    } else {

    }
  },
  updateQueryId: (id) => {
    set({querySessionId: id},false);
  }
});
