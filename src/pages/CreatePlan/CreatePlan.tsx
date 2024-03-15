// PlanSelectionForm.js
import React from 'react';
import axios from 'axios';
import { Form, Select, Button,message,Row,Col } from 'antd';

const { Option } = Select;

const CreatePlan = () => {
  const onFinish = async (values: any) => {
    console.log('Selected Plan:', values);
    // Here you can perform any action like submitting the form data
    await axios.post('http://localhost:5000/plans', values)
    .then(response => {
      console.log('New plan created:', response.data);
      message.success('New plan created successfully!');
    })
    .catch(error => {
      message.error('Failed to create new plan!');
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto',marginTop:"60px" }}>
        <h4>Create a new Plan</h4>
      <Form
        name="plan-selection-form"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="planName"
              label="Plan Name"
              rules={[{ required: true, message: 'Please select a plan!' }]}
            >
              <Select>
                <Option value="Platinum365">Platinum365</Option>
                <Option value="Gold180">Gold180</Option>
                <Option value="Silver90">Silver90</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="planCost"
              label="Plan Cost"
              rules={[{ required: true, message: 'Please select a plan!' }]}
            >
              <Select>
                <Option value={499}>499</Option>
                <Option value={299}>299</Option>
                <Option value={199}>199</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="validity"
              label="Validity (Days)"
              rules={[{ required: true, message: 'Please select a plan!' }]}
            >
              <Select>
                <Option value={365}>365</Option>
                <Option value={180}>180</Option>
                <Option value={90}>90</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="planStatus"
              label="Plan Status"
              rules={[{ required: true, message: 'Please select a plan!' }]}
            >
              <Select>
                <Option value={'active'}>Active</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Plan
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePlan;
