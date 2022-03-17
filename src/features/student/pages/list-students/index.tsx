import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import { selectCityMap } from 'features/city/citySlice';
import { FilterStudent, StudentTable } from 'features/student/components';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from 'features/student/studentSlice';
import { ListParams } from 'models';
import React, { useEffect } from 'react';
import style from './index.module.scss';

export interface ListStudentsProps {}

const cx = classNames.bind(style);

export default function ListStudents(props: ListStudentsProps) {
  const dispatch = useAppDispatch();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [filter]);

  const handlePageChange = (page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
    
  }
  return (
    <div>
      <div className={cx('header')}>
        <h2>List Students</h2>
        <Button type="primary" size="large">
          <PlusCircleFilled />
          Add Student
        </Button>
      </div>
      <FilterStudent filter={filter} onSearchChange={handleSearchChange}/>
      <StudentTable data={studentList} loading={loading} cityMap={cityMap} />
      <Pagination
        className={cx('rc-pagination')}
        total={pagination?._totalRows}
        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} students`}
        defaultPageSize={pagination?._limit}
        current={pagination?._page}
        onChange={handlePageChange}
      />
    </div>
  );
}
