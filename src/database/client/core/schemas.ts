// ************************************** //
// ******* Version 1 - 2023-11-14 ******* //
// ************************************** //
// - Initial database schema with `files` table

export const dbSchemaV1 = {
  files: '&id, name, fileType, saveMode',
};

// ************************************** //
// ******* Version 2 - 2023-11-27 ******* //
// ************************************** //
// - Added `sessions` 、`messages` 、`topics` tables
// - Added `createdAt` and `updatedAt` fields to all
export const dbSchemaV2 = {
  files: '&id, name, fileType, saveMode, createdAt, updatedAt, messageId, sessionId',

  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId]',
  sessions: '&id, type, group, meta.title, meta.description, meta.tags, createdAt, updatedAt',
  topics: '&id, title, favorite, createdAt, updatedAt, sessionId',
};

// ************************************** //
// ******* Version 3 - 2023-12-06 ******* //
// ************************************** //
// - Added `plugins` table

export const dbSchemaV3 = {
  ...dbSchemaV2,
  plugins:
    '&identifier, type, manifest.type, manifest.meta.title, manifest.meta.description, manifest.meta.author, createdAt, updatedAt',
};

// ************************************** //
// ******* Version 4 - 2024-01-21 ******* //
// ************************************** //
// - Added `sessionGroups` table
// - Add `pinned` to sessions table

export const dbSchemaV4 = {
  ...dbSchemaV3,
  sessionGroups: '&id, name, sort, createdAt, updatedAt',
  sessions:
    '&id, type, group, pinned, meta.title, meta.description, meta.tags, createdAt, updatedAt',
};

// ************************************** //
// ******* Version 5 - 2024-01-29 ******* //
// ************************************** //
// - Added `users` table

export const dbSchemaV5 = {
  ...dbSchemaV4,
  users: '++id',
};

// ************************************** //
// ******* Version 6 - 2024-02-27 ******* //
// ************************************** //
// - Added uuid to `users` table
// - Added traceId to `messages` table
export const dbSchemaV6 = {
  ...dbSchemaV5,
  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId], traceId',
  users: '++id, uuid',
};

// ************************************** //
// ******* Version 7 - 2024-03-14 ******* //
// ************************************** //
// - Added id to `plugins` table
export const dbSchemaV7 = {
  ...dbSchemaV6,
  plugins:
    '&identifier, id, type, manifest.type, manifest.meta.title, manifest.meta.description, manifest.meta.author, createdAt, updatedAt',
};

// ************************************** //
// ******* Version 7 - 2024-03-14 ******* //
// ************************************** //
// - Added conversation_id to `session` table

export const dbSchemaV8 = {
  ...dbSchemaV7,
  sessions:
    '&id, type, group, pinned, meta.title, meta.description, meta.tags, createdAt, updatedAt, conversation_id',
};

export const dbSchemaV9 = {
  ...dbSchemaV8,
  sessions:
    '&id, type, group, pinned, meta.title, meta.description, meta.tags, createdAt, updatedAt, conversation_id, userId, appId, [userId+appId]',
};

export const dbSchemaV10 = {
  ...dbSchemaV9,
  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId], traceId, feedback',
}

export const dbSchemaV11 = {
  ...dbSchemaV10,
  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId], traceId, feedback, backendMessageId',
}

export const dbSchemaV12 = {
  ...dbSchemaV10,
  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId], traceId, feedback, backendMessageId, retrieverResources',
}

export const dbSchemaV13 = {
  ...dbSchemaV10,
  messages:
    '&id, role, content, fromModel, favorite, plugin.identifier, plugin.apiName, translate.content, createdAt, updatedAt, sessionId, topicId, quotaId, parentId, [sessionId+topicId], traceId, feedback, backendMessageId, retrieverResources, fileInfoList',
}
