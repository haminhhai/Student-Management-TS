import { Badge, Button, Space, Table } from 'antd';
import classNames from 'classnames/bind';
import { City, Student } from 'models';
import React, { Dispatch, SetStateAction } from 'react';
import style from './index.module.scss';

export interface StudentTableProps {
  data: Student[];
  loading: any;
  cityMap: {
    [key: string]: City;
  };
  openModal: () => void;
  editStudent: (record: Student) => void;
  setSelectedStudent: Dispatch<SetStateAction<Student | undefined>>;
}

const cx = classNames.bind(style);

export function StudentTable({
  data,
  loading,
  cityMap,
  openModal,
  setSelectedStudent,
  editStudent,
}: StudentTableProps) {
  const formatMark = (mark: number) => {
    switch (true) {
      case mark < 4:
        return '#f5222d';
      case mark < 8:
        return '#2db7f5';
      case mark <= 10:
        return '#52c41a';
    }
  };

  const formatGender = (gen: string) => {
    if (!gen) return '';

    return `${gen[0].toUpperCase()}${gen.slice(1)}`;
  };

  const onEdit = (record: Student) => {
    editStudent(record);
  };

  const onRemove = (record: Student) => {
    setSelectedStudent(record);
    openModal();
  };

  return (
    <Table<Student>
      className={cx('rc-table')}
      dataSource={data}
      pagination={false}
      loading={loading}
    >
      <Table.Column<Student> key="id" title="ID" dataIndex="id" />
      <Table.Column<Student> key="name" title="Name" dataIndex="name" />
      <Table.Column<Student>
        key="gender"
        title="Gender"
        dataIndex="gender"
        render={(gender) => formatGender(gender)}
      />
      <Table.Column<Student>
        key="mark"
        title="Mark"
        dataIndex="mark"
        render={(mark) => (
          <Badge
            className={cx('badge')}
            style={{ backgroundColor: formatMark(mark) }}
            count={mark}
          />
        )}
      />
      <Table.Column<Student>
        key="city"
        title="City"
        dataIndex="city"
        render={(city) => cityMap[city]?.name}
      />
      <Table.Column<Student>
        key="action"
        render={(content, record) => {
          return {
            props: { className: cx('action') },
            children: (
              <Space size="middle">
                <Button type="primary" onClick={() => onEdit(record)}>
                  Edit
                </Button>
                <Button type="primary" danger onClick={() => onRemove(record)}>
                  Remove
                </Button>
              </Space>
            ),
          };
        }}
      />
    </Table>
  );
}
