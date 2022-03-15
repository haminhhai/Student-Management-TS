import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import { StudentTable } from 'features/student/components';
import { selectStudentList, studentActions } from 'features/student/studentSlice';
import React, { useEffect } from 'react';
import style from './index.module.scss';

export interface ListStudentsProps {}

const cx = classNames.bind(style);

export default function ListStudents(props: ListStudentsProps) {
  const dispatch = useAppDispatch();

  const studentList = useAppSelector(selectStudentList);

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, [dispatch]);
  return (
    <div>
      <div className={cx('header')}>
        <h2>List Students</h2>
        <Button type="primary" size="large">
          <PlusCircleFilled />
          Add Student
        </Button>
      </div>
      <StudentTable data={studentList} />
    </div>
  );
}
