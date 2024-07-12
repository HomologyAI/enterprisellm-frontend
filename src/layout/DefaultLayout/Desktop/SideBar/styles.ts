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


export const useStyles = createStyles(({ css, token }) => {


  return ({
    activeItem: css`
      background: rgba(230, 244, 255, 1);
    `,
    container: css`
      width: auto;
      height: 100%;
      min-height: 640px;
      padding-block: 0;
      padding-inline: 0;
    `,
    header: css`
      padding: 16px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    headerName: css`
      margin-left: 8px;
      font-size: 16px;
      font-weight: bold;
    `,
    item: css`
      padding: 4px 12px 4px 12px;
      width: 100%;
      color: rgba(0, 102, 255, 1);
      font-size: 16px;
      border-radius: 8px;
    `,
    itemText: css`
      margin-left: 6px;
    `,
    items: css`
      padding: 20px 6px;
      width: 100%;
    `,
    menu: css`
      flex-shrink: 1;
      flex-grow: 1;
      margin-top: 20px;
      border: none !important;

      .ant-menu-item {
        padding: 0 16px;
      }

      .ant-menu-item-selected {
        background-color: rgba(38, 22, 63, 0.08);
      }
    `
  })
});
