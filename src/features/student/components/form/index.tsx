import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import { useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import style from './index.module.scss';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
  isAdd: boolean;
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 24 },
};
const cx = classNames.bind(style);
const { Option } = Select;

export function StudentForm({ initialValues, isAdd, onSubmit }: StudentFormProps) {
  const [form] = Form.useForm();

  const cityOptions = useAppSelector(selectCityOptions);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setLoadingSubmit(true);
      await onSubmit?.({ ...initialValues, ...formValues });
    } catch (error) {
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Form
      className={cx('form-student')}
      layout="vertical"
      form={form}
      onFinish={handleFormSubmit}
      initialValues={initialValues}
      {...layout}
    >
      <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Age" name="age" rules={[{ required: true }]}>
        <InputNumber min={6} max={30} />
      </Form.Item>
      <Form.Item label="Mark" name="mark" rules={[{ required: true }]}>
        <InputNumber min={0} max={10} step={0.1} />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Select>
          {Array.isArray(cityOptions) &&
            cityOptions.length > 0 &&
            cityOptions.map((city) => (
              <Option key={city.value} value={city.value}>
                {city.label}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button loading={loadingSubmit} htmlType="submit" type="primary">
          {isAdd ? 'Create' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  );
}
