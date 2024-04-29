import { getServerConfig } from '@/config/server';
import { GlobalServerConfig } from '@/types/settings';

import { parseAgentConfig } from './parseDefaultAgent';

export const runtime = 'edge';

/**
 * get Server config to client
 */
export const GET = async () => {
  const {
    ENABLE_LANGFUSE,
    CUSTOM_MODELS,
    ENABLED_MOONSHOT,
    ENABLED_ZHIPU,
    ENABLED_AWS_BEDROCK,
    ENABLED_GOOGLE,
    ENABLED_GROQ,
    ENABLE_OAUTH_SSO,
    ENABLE_OLLAMA,
    ENABLED_PERPLEXITY,
    ENABLED_ANTHROPIC,
    ENABLED_MISTRAL,
    ENABLED_OPENROUTER,
    ENABLED_ZEROONE,
    ENABLED_TOGETHERAI,
    DEFAULT_AGENT_CONFIG,
    OLLAMA_CUSTOM_MODELS,
    OPENROUTER_CUSTOM_MODELS,
  } = getServerConfig();

  const config: GlobalServerConfig = {
    customModelName: CUSTOM_MODELS,
    defaultAgent: {
      config: parseAgentConfig(DEFAULT_AGENT_CONFIG),
      enableAutoCreateTopic: false,
    },

    enabledOAuthSSO: ENABLE_OAUTH_SSO,
    languageModel: {
      anthropic: { enabled: false },
      bedrock: { enabled: false },
      google: { enabled: false },
      groq: { enabled: false },
      mistral: { enabled: false },
      moonshot: { enabled: false },
      ollama: { customModelName: OLLAMA_CUSTOM_MODELS, enabled: false },
      openrouter: { customModelName: OPENROUTER_CUSTOM_MODELS, enabled: false },
      perplexity: { enabled: false },
      togetherai: { enabled: false },
      zeroone: { enabled: false },
      zhipu: { enabled: false },
      qwen: { enabled: true },
    },
    telemetry: {
      langfuse: ENABLE_LANGFUSE,
    },
  };

  return new Response(JSON.stringify(config));
};
