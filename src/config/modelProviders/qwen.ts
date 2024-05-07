import { ModelProviderCard } from '@/types/llm';

// refs to: https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
const Qwen: ModelProviderCard = {
  chatModels: [
    {
      displayName: 'Qwen-72B-Chat',
      description: '适用于各种文本生成和理解任务',
      files: true,
      functionCall: true,
      hidden: false,
      id: 'qwen-72b-chat',
      tokens: 32_768,
      vision: true,
    },
  ],
  enabled: true,
  id: 'qwen',
};

export default Qwen;
