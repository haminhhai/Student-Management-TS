import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Input } from 'antd';
import classNames from 'classnames/bind';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';
import style from './index.module.scss';

export interface FilterStudentProps {
  filter: ListParams;
  // onChange: (filter: ListParams) => void;
  // cityList: City[];
  onSearchChange: (filter: ListParams) => void;
}

const cx = classNames.bind(style);

export function FilterStudent({ filter, onSearchChange }: FilterStudentProps) {
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = { ...filter, name_like: e.target.value };

    onSearchChange(newFilter);
  };

  return (
    <Row className={cx('container')}>
      <Col xs={24} md={8}>
        <Input prefix={<SearchOutlined />} onChange={onSearch} />
      </Col>
    </Row>
  );
}
