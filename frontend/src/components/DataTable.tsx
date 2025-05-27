import React, { useEffect, useState } from 'react';
import { Popconfirm, Table } from 'antd';
import type { TableProps } from 'antd';
import { Box } from '@mui/material';

interface InvoiceData {
  key: string;
  id: string;
  providerType: string;
  orderType: string;
  deductionPercentage: number;
  recordDate: string;
  newUpdate: string;
  vatType: string;
  actionType: string;
  supplier: string;
  asSupplier: string;
  taxWithheld: number;
  details: string;
  totalIncludingVat: number;
  invoiceType: string;
  typeOfMovement: string;
  natureOfInvoicePlan: string;
  planTax: number;
  invoiceDate: string;
  invoiceNumber: string;
}

interface DataTableProps {
  onEdit: (invoice: InvoiceData) => void;
  refreshKey: number;
}

const DataTable: React.FC<DataTableProps> = ({ onEdit, refreshKey }) => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableProps<InvoiceData>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Provider Type', dataIndex: 'providerType', key: 'providerType' },
    { title: 'Order Type', dataIndex: 'orderType', key: 'orderType' },
    { title: 'Deduction Percentage', dataIndex: 'deductionPercentage', key: 'deductionPercentage' },
    { title: 'Record', dataIndex: 'recordDate', key: 'recordDate' },
    { title: 'Update', dataIndex: 'newUpdate', key: 'newUpdate' },
    { title: 'Action', dataIndex: 'actionType', key: 'actionType' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'As Supplier', dataIndex: 'asSupplier', key: 'asSupplier' },
    { title: 'Tax Withheld', dataIndex: 'taxWithheld', key: 'taxWithheld' },
    { title: 'Details', dataIndex: 'details', key: 'details' },
    { title: 'Total Including VAT', dataIndex: 'totalIncludingVat', key: 'totalIncludingVat' },
    { title: 'InVoice Type', dataIndex: 'invoiceType', key: 'invoiceType' },
    { title: 'Type Of Movement', dataIndex: 'typeOfMovement', key: 'typeOfMovement' },
    { title: 'Nature of Invoice Plan', dataIndex: 'natureOfInvoicePlan', key: 'natureOfInvoicePlan' },
    { title: 'Plan Tax', dataIndex: 'planTax', key: 'planTax' },
    { title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate' },
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
    {
      title: 'Actions',
      fixed: 'right',
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <a onClick={() => onEdit(record)} style={{ marginRight: 8 }}>Edit</a>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://localhost:7182/api/invoices');
        const json = await res.json();
        const itemsWithKey = json.items.map((item: InvoiceData) => ({
          ...item,
          key: item.id || item.key || Math.random().toString(),
        }));
        setData(itemsWithKey);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);
  
  const handleDelete = async (key: string) => {
    try 
    {
      const res = await fetch(`https://localhost:7182/api/invoices/${key}`, {
      method: 'DELETE',
    });
      if (!res.ok) {
        throw new Error('Failed to delete invoice');
      }
      setData((prevData) => prevData.filter((item) => item.key !== key));
    } 
    catch (error) {
    console.error('Failed to delete invoice:', error);
  }
};


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', borderRadius: 2, p: 2, mt: 2 }}>
      <Table<InvoiceData>
        className="custom-ant-table"
        loading={loading}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        bordered
      />
    </Box>
  );
};

export default DataTable;
