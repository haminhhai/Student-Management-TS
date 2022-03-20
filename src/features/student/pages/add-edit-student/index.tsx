import { notification, PageHeader } from 'antd';
import studentApi from 'api/student';
import classNames from 'classnames/bind';
import { StudentForm } from 'features/student/components';
import { Student } from 'models';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import style from './index.module.scss';

const cx = classNames.bind(style);

export default function AddEditStudent() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();

  const isAdd = useMemo(() => !studentId, [studentId]);

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (values: Student) => {
    if (isAdd) {
      await studentApi.add(values);
    } else {
      await studentApi.update(values);
    }

    notification.success({ message: isAdd ? 'Student added' : 'Student updated' });

    history.push('/admin/students');
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <div>
      <PageHeader
        title={isAdd ? 'Add New Student' : 'Edit Student'}
        onBack={() => history.push('/admin/students')}
      />
      <div className={cx('form-wrapper')}>
        {(isAdd || Boolean(student)) && (
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
            isAdd={isAdd}
          />
        )}
      </div>
    </div>
  );
}
