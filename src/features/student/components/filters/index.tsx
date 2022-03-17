import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Input, Select, Button } from 'antd';
import classNames from 'classnames/bind';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useState } from 'react';
import style from './index.module.scss';

export interface FilterStudentProps {
  filter: ListParams;
  onChange: (filter: ListParams) => void;
  cityList: City[];
  onSearchChange: (filter: ListParams) => void;
}

const cx = classNames.bind(style);
const { Option } = Select;

export function FilterStudent({ filter, cityList, onChange, onSearchChange }: FilterStudentProps) {
  const [name, setName] = useState('')

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    setName(e.target.value);
    onSearchChange(newFilter);
  };

  const onCityChange = (value: string) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: value || undefined,
    };

    onChange(newFilter);
  };

  const onSortChange = (value: string) => {
    if (!onChange) return;

    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      name_like: undefined,
      city: undefined,
      _sort: undefined,
    };

    setName('');
    onChange(newFilter);
  };



  return (
    <Row gutter={16} className={cx('container')}>
      <Col xs={24} md={7}>
        <Input value={name} prefix={<SearchOutlined />} onChange={onSearch} />
      </Col>
      <Col xs={24} md={7}>
        <Select value={filter.city || ''} onChange={onCityChange} className={cx('select')}>
          <Option value="">All Cities</Option>
          {cityList.map((city) => (
            <Option key={city.code} value={city.code}>
              {city.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} md={7}>
        <Select value={filter._sort ? `${filter._sort}.${filter._order}` : ''} onChange={onSortChange} className={cx('select')}>
          <Option value="">No Sort</Option>
          <Option value='name.asc'>Name ASC</Option>
          <Option value='name.desc'>Name DESC</Option>
          <Option value='mark.asc'>Mark ASC</Option>
          <Option value='mark.desc'>Mark DESC</Option>
        </Select>
      </Col>
      <Col xs={24} md={3}>
        <Button onClick={handleClearFilter}>Clear Filters</Button>
      </Col>
    </Row>
  );
}
