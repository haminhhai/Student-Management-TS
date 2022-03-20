import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Modal, notification, PageHeader, Pagination } from 'antd';
import studentApi from 'api/student';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { FilterStudent, StudentTable } from 'features/student/components';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from 'features/student/studentSlice';
import _ from 'lodash';
import { ListParams, Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import style from './index.module.scss';

export interface ListStudentsProps {}

const cx = classNames.bind(style);

export default function ListStudents(props: ListStudentsProps) {
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

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
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleEditStudent = (record: Student) => {
    history.push(`${match.url}/${record?.id}`);
  };

  const handleOk = async () => {
    setVisible(false);
    try {
      // Remove student api
      await studentApi.remove(selectedStudent!.id || '');

      // Trigger to refetch student list
      const cloneFilter = _.cloneDeep(filter);
      dispatch(studentActions.setFilter(cloneFilter));
      notification.success({ message: 'Student removed' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <PageHeader
        title="List Students"
        extra={[
          <Link key='1' to={`${match.url}/add`}>
            <Button type="primary" size="large">
              <PlusCircleFilled />
              Add Student
            </Button>
          </Link>,
        ]}
      />
      <FilterStudent
        filter={filter}
        onSearchChange={handleSearchChange}
        cityList={cityList}
        onChange={handleFilterChange}
      />
      <StudentTable
        data={studentList}
        loading={loading}
        cityMap={cityMap}
        openModal={() => setVisible(true)}
        setSelectedStudent={setSelectedStudent}
        editStudent={handleEditStudent}
      />
      <Pagination
        className={cx('rc-pagination')}
        total={pagination?._totalRows}
        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} students`}
        defaultPageSize={pagination?._limit}
        current={pagination?._page}
        onChange={handlePageChange}
      />

      <Modal
        title="Remove Student Confirm"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
      >
        Are you sure to remove the student named
        <span className={cx('student-name')}> {selectedStudent?.name}</span> ?
      </Modal>
    </div>
  );
}
