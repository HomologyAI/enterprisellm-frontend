import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  (
    { cx, css, token, isDarkMode, responsive },
    {
      placement,
      type,
      title,
      primary,
      avatarSize,
      editing,
      time,
    }: {
      avatarSize?: number;
      editing?: boolean;
      placement?: 'left' | 'right';
      primary?: boolean;
      showTitle?: boolean;
      time?: number;
      title?: string;
      type?: 'block' | 'pure';
    },
  ) => {
    const blockStylish = css`
      padding-block: 8px;
      padding-inline: 12px;

      background-color: ${!primary
      ? isDarkMode
        ? token.colorFill
        : '#FAFAFA'
      : isDarkMode
        ? token.colorFillSecondary
        : '#FAFAFA'};
      border-radius: 8px;

      transition: background-color 100ms ${token.motionEaseOut};
    `;

    const pureStylish = css`
      padding-block-start: ${title ? 0 : '6px'};
    `;

    const pureContainerStylish = css`
      margin-block-end: -16px;
      transition: background-color 100ms ${token.motionEaseOut};
    `;

    const typeStylish = type === 'block' ? blockStylish : pureStylish;

    const editingStylish =
      editing &&
      css`
        width: 100%;
      `;

    return {
      actions: cx(
        css`
          flex: none;
          align-self: ${type === 'block'
          ? 'flex-end'
          : placement === 'left'
            ? 'flex-start'
            : 'flex-end'};
          justify-content: ${placement === 'left' ? 'flex-end' : 'flex-start'};
        `,
        editing &&
        css`
            pointer-events: none !important;
            opacity: 0 !important;
          `,
      ),
      avatarContainer: css`
        position: relative;
        flex: none;
        width: ${avatarSize}px;
        height: ${avatarSize}px;
      `,
      avatarGroupContainer: css`
        width: ${avatarSize}px;
      `,
      container: cx(
        type === 'pure' && pureContainerStylish,
        css`
          position: relative;
          width: 100%;
          max-width: 100vw;
          padding: 32px 36px 30px 36px;

          time {
            display: inline-block;
            white-space: nowrap;
          }

          div[role='menubar'] {
            display: flex;
          }

          time,
          div[role='menubar'] {
            pointer-events: none;
            opacity: 0;
            transition: opacity 200ms ${token.motionEaseOut};
          }

          &:hover {
            time,
            div[role='menubar'] {
              pointer-events: unset;
              opacity: 1;
            }
          }

          ${responsive.mobile} {
            padding-block: 4px;
            padding-inline: 8px;
          }
        `,
      ),
      editingContainer: cx(
        editingStylish,
        css`
          padding-block: 8px 12px;
          padding-inline: 12px;
          border: 1px solid ${token.colorBorderSecondary};
          background: rgba(230, 244, 255, 1);
          &:active,
          &:hover {
            border-color: ${token.colorBorder};
          }
        `,
        type === 'pure' &&
        css`
            background: ${token.colorFillQuaternary};
            border-radius: ${token.borderRadius}px;
          `,
      ),
      editingInput: css`
        width: 100%;
      `,
      errorContainer: css`
        position: relative;
        overflow: hidden;
        width: 100%;
      `,

      loading: css`
        position: absolute;
        inset-block-end: 0;
        inset-inline: ${placement === 'right' ? '-4px' : 'unset'}
          ${placement === 'left' ? '-4px' : 'unset'};

        width: 16px;
        height: 16px;

        color: ${token.colorBgLayout};

        background: ${token.colorPrimary};
        border-radius: 50%;
      `,
      message: cx(
        typeStylish,
        css`
          position: relative;

          ${responsive.mobile} {
            width: 100%;
          }
        `,
      ),
      messageContainer: cx(
        editingStylish,
        css`
          position: relative;
          max-width: 70%;
          margin-block-start: ${time ? -16 : 0}px;

          ${responsive.mobile} {
            overflow-x: auto;
          }
        `,
      ),
      messageContent: cx(
        editingStylish,
        css`
          position: relative;
          overflow-x: hidden;
          max-width: 100%;

          ${responsive.mobile} {
            flex-direction: column !important;
          }
        `,
      ),
      messageExtra: cx('message-extra'),
      messageRetrieverButton: cx(editingStylish, css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-color: #EBEBEB;
        box-shadow: 0px 5px 14px 0px #0000000F;
        &:hover {
          box-shadow: 0px 5px 14px 0px #0000000F;
          border-color: #EBEBEB !important;
        }
      `),
      messageRetrieverContainer: cx(
        editingStylish,
        css`
          margin-top: 8px;
        `
      ),
      name: css`
        margin-block-end: 6px;

        font-size: 12px;
        line-height: 1;
        color: ${token.colorTextDescription};
        text-align: ${placement === 'left' ? 'left' : 'right'};
      `,
    };
  },
);
