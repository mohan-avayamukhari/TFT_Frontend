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
  onDelete: (id: string) => void;
  refreshKey: number;
}

const DataTable: React.FC<DataTableProps> = ({ onEdit, onDelete, refreshKey }) => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://tft-backend-bxgka4cvasgvf6an.centralindia-01.azurewebsites.net/api/invoices');
        const result = await response.json();
        const itemsWithKey = result.items.map((item: any) => ({
          ...item,
          key: item.id,
        }));
        setData(itemsWithKey);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

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
      width: 100,
      fixed: 'right',
      render: (_, record) =>
        data.length >= 1 ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a onClick={() => onEdit(record)} style={{ marginRight: 8 }}>Edit</a>
            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

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
