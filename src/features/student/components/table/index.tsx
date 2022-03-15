import { Button, Space, Table } from 'antd';
import classNames from 'classnames/bind';
import { Student } from 'models';
import React from 'react';
import style from './index.module.scss';

export interface StudentTableProps {
  data: Student[];
}

const cx = classNames.bind(style);

export function StudentTable({ data }: StudentTableProps) {
  return (
    <Table<Student> className={cx('rc-table')} dataSource={data}>
      <Table.Column<Student> key="id" title="ID" dataIndex="id" />
      <Table.Column<Student> key="name" title="Name" dataIndex="name" />
      <Table.Column<Student> key="gender" title="Gender" dataIndex="gender" />
      <Table.Column<Student> key="mark" title="Mark" dataIndex="mark" />
      <Table.Column<Student> key="city" title="City" dataIndex="city" />
      <Table.Column<Student>
        key="action"
        render={() => {
          return {
            props: { className: cx('action') },
            children: (
              <Space size="middle">
                <Button type="primary">Edit</Button>
                <Button type='primary' danger>Remove</Button>
              </Space>
            ),
          };
        }}
      />
    </Table>
  );
}
