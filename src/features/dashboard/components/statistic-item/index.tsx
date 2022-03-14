import { Card } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import style from './index.module.scss';

const cx = classNames.bind(style);

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: number;
}

export function StatisticItem(props: StatisticItemProps) {
  const { icon, label, value } = props;
  return (
    <Card className={cx('card')}>
      <div>
        <h4>{label}</h4>
        <h2>{value}</h2>
      </div>
      <div className={cx('card_icon')}>{icon}</div>
    </Card>
  );
}
