import { createStyles } from 'antd-style';

// export const useStyles = createStyles(
//   ({ css, token }) => css`
//     width: 162px;
//     height: 100%;
//     min-height: 640px;
//     padding-block: 0;
//     padding-inline: 0;
//
//     background: ${token.colorBgContainer};
//     border-inline-end: 1px solid ${token.colorBorder};
//   `,
// );

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 162px;
    height: 100%;
    min-height: 640px;
    padding-block: 0;
    padding-inline: 0;

    background: ${token.colorBgContainer};
    border-inline-end: 1px solid ${token.colorBorder};
  `,
  header: css`
    padding: 16px;
    width: 100%;
    border-bottom: 1px solid ${token.colorBorder};
  `,
  items: css`
    padding: 20px 6px;
    width: 100%;
  `,
  item: css`
    padding: 12px 6px;
    width: 100%;
    color: rgba(0, 102, 255, 1);
    font-size: 18px;
    border-radius: 4px;
    
    background: rgba(230, 244, 255, 1);
  `,
  itemText: css`
    margin-left: 10px;
  `,

}));