import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Space, Table, Modal, message } from 'antd';
import type { TableProps } from 'antd';
import Data from '../plans1.json';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface DataType {
    planName: string;
    planCost: number;
    validity: number;
    planStatus: string;
}


const CustomerPlan: React.FC = () => {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'PlanName',
            dataIndex: 'planName',
            key: 'planName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'PlanCost',
            dataIndex: 'planCost',
            key: 'planCost',
        },
        {
            title: 'Validity',
            dataIndex: 'validity',
            key: 'validity',
        },
        {
            title: 'PlanStatus',
            dataIndex: 'planStatus',
            key: 'planStatus',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a style={{ color: "blue" }} onClick={() => showModal(record)}>Renew Plan</a>
                    <a style={{ color: "blue" }} onClick={() => handleDelete(record)}>Delete</a>
                </Space>
            ),
        },
    ];

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>();

    
    const showModal = (record: any) => {
        setSelectedPlan(record);
        setVisible(true);
    };

    //Deleting the record
    const handleDelete = async (record: any) => {
        await axios.delete(`http://localhost:5000/plans/${record.id}`)
            .then(() => {
                setData(data.filter(item => item.id !== record.id));
                message.success('Record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting record:', error);
                message.error('Failed to delete record!');
            });
    };

    //renewing the status
    const handleChange = () => {
        const updatedPlan = {
            ...selectedPlan,
            planStatus: selectedPlan.planStatus === 'Active' ? 'Inactive' : 'Active'
        };

        axios.put(`http://localhost:5000/plans/${selectedPlan.id}`, updatedPlan)
            .then(response => {
                console.log('Plan status updated successfully:', response.data);
                const updatedPlans = data.map(plan => {
                    if (plan.id === updatedPlan.id) {
                        return updatedPlan;
                    }
                    return plan;
                });
                setData(updatedPlans);
                setSelectedPlan(updatedPlan);
            })
            .catch(error => {
                console.error('Error updating plan status:', error);
            });
        getEvents();
    };

    //closing the modal
    const handleCancel = () => {
        setVisible(false);
    };

    //API call
    useEffect(() => {
        getEvents();
    }, []);

    //GET API method using axios
    const getEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/plans');
            const data = response.data;
            setData(data);
            setLoading(false);
        }
        catch (error) {
            console.error('Error:', error);
        };
    }


    return (
        <div>
            <div style={{ textAlign: "right" }}><Link to="/createplan"><Button variant='link'>Create a new Plan</Button></Link></div>
            <h2>
                All Plans:
            </h2>
            <Table columns={columns}
                dataSource={data}
                loading={loading} />

            <Modal
                title={`${selectedPlan?.planName} Details`}
                visible={visible}
                onCancel={handleCancel}
                footer={[
                    <Button variant="link" key="upgrade" onClick={handleChange}>
                        {selectedPlan?.planStatus === 'Active' ? 'Inactive' : 'Active'}
                    </Button>,
                ]}
            >
                <p>Plan Name: {selectedPlan?.planName}</p>
                <p>Plan Cost: {selectedPlan?.planCost}</p>
                <p>Validity: {selectedPlan?.validity} days</p>
                <p>Plan Status: {selectedPlan?.planStatus}</p>
            </Modal>
        </div>
    )
};

export default CustomerPlan;