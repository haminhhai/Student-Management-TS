import { Card, Table } from 'antd';
import classNames from 'classnames/bind';
import { Student } from 'models';
import React from 'react';
import style from './index.module.scss';

const cx = classNames.bind(style);

export interface TopTableProps {
  title: string;
  data: Student[];
}

export function TopTable({ title, data }: TopTableProps) {
  const indexForData = (data: Student[]) => {
    return data.map((item, index) => {
      return { ...item, index: index + 1 };
    });
  };

  return (
    <Card title={title} className={cx('card')}>
      <Table<Student> className={cx('top-table')} dataSource={indexForData(data)} pagination={false}>
        <Table.Column<Student>
          key="index"
          title="No."
          dataIndex="index"
          render={(item) => <span className={cx('ranking_idx', {top_3: item <= 3})}>{item}</span>}
        />
        <Table.Column<Student> key="name" title="Name" dataIndex="name" />
        <Table.Column<Student> key="mark" title="Mark" dataIndex="mark" />
      </Table>
    </Card>
  );
}
