import { PageHeader } from 'antd';
import studentApi from 'api/student';
import { Student } from 'models';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export interface AddEditStudentProps {
}

export default function AddEditStudent (props: AddEditStudentProps) {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string}>()

  const isAdd = useMemo(() => !studentId, [studentId]);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response)
      } catch (error) {
        console.log(error);
        
      }
    })()

  }, [studentId]);

  console.log(student);
  
  return (
    <div>
      <PageHeader title={isAdd ? 'Add New Student' : 'Edit Student'} onBack={() => history.push('/admin/students')} />
    </div>
  );
}
