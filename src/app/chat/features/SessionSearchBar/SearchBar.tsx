'use client';

import { LucideLoader2, Search } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import useControlledState from 'use-merge-value';

import { Icon, Input, type InputProps } from '@lobehub/ui';

export interface SearchBarProps extends InputProps {
  defaultValue?: string;
  /**
   * @description Whether to enable the shortcut key to focus on the input
   * @default false
   */
  enableShortKey?: boolean;
  loading?: boolean;
  onInputChange?: (value: string) => void;
  /**
   * @description The shortcut key to focus on the input. Only works if `enableShortKey` is true
   * @default 'f'
   */
  shortKey?: string;
  /**
   * @description Whether add spotlight background
   * @default false
   */
  spotlight?: boolean;
  value?: string;
}

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, stylish, cx }) => ({
  icon: css`
    color: ${token.colorTextPlaceholder};
  `,
  input: css`
    position: relative;
    padding-block: 10px;
    padding-inline: 12px 12px;
    height: 40px;
    background-color: #F0F0F0;
    border: 0;
  `,
  search: css`
    position: relative;
    max-width: 100%;
  `,

  tag: cx(
    stylish.blur,
    css`
      pointer-events: none;

      position: absolute;
      z-index: 5;
      inset-block-start: 50%;
      inset-inline-end: 0;
      transform: translateY(-50%);

      color: ${token.colorTextDescription};
    `,
  ),
}));

const SearchBar = memo<SearchBarProps>(
  ({
     defaultValue,
     spotlight,
     className,
     value,
     onInputChange,
     placeholder,
     enableShortKey,
     shortKey = 'f',
     loading,
     ...properties
   }) => {
    const [inputValue, setInputValue] = useControlledState<string>(defaultValue as any, {
      defaultValue,
      onChange: onInputChange,
      value,
    });
    const { styles, cx } = useStyles();
    const inputReference: any = useRef<HTMLInputElement>();

    useEffect(() => {
      if (!enableShortKey) return;

      const isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(
        typeof navigator === 'undefined' ? '' : navigator?.platform,
      );

      const handler = (event_: KeyboardEvent) => {
        if ((isAppleDevice ? event_.metaKey : event_.ctrlKey) && event_.key === shortKey) {
          event_.preventDefault();
          inputReference.current?.focus();
        }
      };

      document.addEventListener('keydown', handler);

      return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
      <div className={cx(styles.search, className)}>
        <Input
          allowClear
          className={styles.input}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={placeholder ?? 'Type keywords...'}
          prefix={
            <Icon
              className={styles.icon}
              icon={loading ? LucideLoader2 : Search}
              size="small"
              spin={loading}
              style={{ marginRight: 4 }}
            />
          }
          ref={inputReference}
          value={value}
          {...properties}
        />
      </div>
    );
  },
);

export default SearchBar;