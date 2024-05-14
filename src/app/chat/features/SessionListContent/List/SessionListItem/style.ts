
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    actions: css`
      position: absolute;
      inset-block-start: 50%;
      inset-inline-end: 16px;
      transform: translateY(-50%);
    `,
    active: css`
      color: ${token.colorText};
      background-color: ${token.colorFillSecondary};

      &:hover {
        background-color: ${token.colorFill};
      }
    `,
    container: css`
      cursor: pointer;
      color: ${token.colorTextTertiary};
      background: transparent;
      transition: background-color 200ms ${token.motionEaseOut};

      &:active {
        background-color: ${token.colorFillSecondary};
      }

      &:hover {
        background-color: ${token.colorFillTertiary};
      }
    `,
    content: css`
      position: relative;
      overflow: hidden;
      flex: 1;
      align-self: center;
      height: 100%;
    `,
    desc: css`
      overflow: hidden;

      width: 100%;

      font-size: 14px;
      line-height: 1;
      //color: ${token.colorTextDescription};
      color: #595959;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,

    pin: css`
      position: absolute;
      inset-block-start: 6px;
      inset-inline-end: 6px;
    `,
    time: css`
      font-size: 14px;
      //color: ${token.colorTextPlaceholder};
      color: #595959;
    `,

    title: css`
      overflow: hidden;

      width: 100%;

      font-size: 18px;
      //color: ${token.colorText}
      color: #262626;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    triangle: css`
      width: 10px;
      height: 10px;

      opacity: 0.5;
      background: ${token.colorPrimaryBorder};
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
      border-radius: 2px;
    `,
  };
});
