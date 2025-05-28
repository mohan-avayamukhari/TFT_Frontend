import React, { useEffect } from 'react';
import {Box} from '@mui/material';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';
import dayjs from 'dayjs';

interface FormSectionProps {
  initialValues?: any;
  onSubmit: (values: any) => Promise<void>;
}

const FormSection: React.FC<FormSectionProps> = ({initialValues, onSubmit}) => {

  useEffect(() => {
  if (initialValues) {
    form.setFieldsValue({
      ...initialValues,
      recordDate: initialValues.recordDate ? dayjs(initialValues.recordDate) : null,
      actionType: initialValues.actionType ? dayjs(initialValues.actionType) : null,
      invoiceDate: initialValues.invoiceDate ? dayjs(initialValues.invoiceDate) : null,
    });
  } else {
    form.resetFields();
  }
}, [initialValues]);

  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
  const formattedValues = {
    ...values,
    recordDate: values.recordDate?.format('YYYY-MM-DD'),
    actionType: values.actionType?.format('YYYY-MM-DD'),
    invoiceDate: values.invoiceDate?.format('YYYY-MM-DD'),
  };

  await onSubmit(formattedValues); // delegate to parent (create or update)
  form.resetFields();
};
  
  return (
    <Box component="fieldset" sx={{ display: 'flex', flexDirection: 'column', 
      fontSize:"small", border: '1px solid #ccc', borderRadius: 2, p: 2, mt: 2 
    }}>
    <Box component="legend" sx={{ px: 1, fontSize: '0.75rem', color: '#555', fontWeight: 'bold' }}>
      Invoice Details
    </Box>
      <Form style={{ fontSize: '0.75rem' }} className="compact-form" form={form}>
        <Box display={'flex'} flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Box>
            <Form.Item name="providerType" label="Provider Type" required 
             rules={[{ required: true, message: 'Please input provider type!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="orderType" label="Choose an order" required>
              <Radio.Group>
                <Radio value="PartialPerformance"> Partial Performance </Radio>
                <Radio value="FullPerformance"> Full Performance </Radio>
              </Radio.Group>
            </Form.Item>
          </Box>
          <Box>
            <Form.Item name="deductionPercentage" label="Deduction Percentage"
            rules={[{ required: true, message: 'Please input deduction percentage!' },
              { type: 'number', min: 0, max: 100, message: 'Must be between 0 and 100' },
              ]}>
              <InputNumber min={0} max={100} style={{width:"7.5rem"}}/>
            </Form.Item>
            <Form.Item name="recordDate" label="Record" required 
            rules={[{ required: true, message: 'Please input record date!' }]}>
              <DatePicker style={{width:"14rem"}}/>
            </Form.Item>
            <Form.Item name="newUpdate" label="Update" required
            rules={[{ required: true, message: 'Please input update' }]}>
              <Input />
            </Form.Item>
          </Box>
          <Box>
            <Form.Item name="actionType" label="Action" required 
            rules={[{ required: true, message: 'Please input action date!' }]}>
              <DatePicker style={{width:"15rem"}}/>
            </Form.Item>
            <Form.Item name="supplier" label="Supplier" required
            rules={[{ required: true, message: 'Please input supplier' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="asSupplier" label="As Supplier" required
            rules={[{ required: true, message: 'Please input as supplier date!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="taxWithheld" label="Tax withheld">
              <Input />
            </Form.Item>
            <Form.Item name="details" label="Details">
              <Input />
            </Form.Item>
          </Box>
        </Box>
        </Form>
        <Form className="compact-form" layout='vertical' form={form} onFinish={handleFinish}>
          <Box display={'flex'} flexDirection='row' justifyContent='space-between' alignItems='center' gap={2}>
          <Form.Item name="totalIncludingVat" label="Total Including VAT" style={{ width: '20%' }}>
            <InputNumber style={{width: "12rem"}}/>
          </Form.Item>
          <Form.Item name="invoiceType" label="Invoice type" style={{ width: '20%'}} 
          rules={[{ required: true, message: 'Please select invoice type' }]}>
            <Select>
              <Select.Option value="Retail">Retail</Select.Option>
              <Select.Option value="Purchase">Purchase</Select.Option>
              <Select.Option value="Return">Return</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="typeOfMovement" label="Type of movement" style={{ width: '20%' }}>
            <Select>
              <Select.Option value="Incoming">Incoming</Select.Option>
              <Select.Option value="Outgoing">Outgoing</Select.Option>
              <Select.Option value="Transfer">Transfer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="natureOfInvoicePlan" label="The nature of the invoice-plan" style={{ width: '40%' }}> 
            <Input/>
          </Form.Item>
          <Form.Item name="planTax" label="Plan tax">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="invoiceDate" label="Invoice date">
            <DatePicker style={{width: "8rem"}}/>
          </Form.Item>
          <Form.Item name="invoiceNumber" label="Invoice number">
            <Input/>
          </Form.Item>
        </Box>
           <Form.Item style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
    </Box>
  );
};

export default FormSection;