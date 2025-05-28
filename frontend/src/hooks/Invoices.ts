import { useState, useEffect } from "react";
import axios from "axios";

export const Invoices = (
  setToastMessage: (msg: string) => void,
  setToastSeverity: (severity: 'success' | 'error' | 'warning' | 'info') => void,
  setIsToastVisible: (visible: boolean) => void
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setIsToastVisible(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://localhost:7182/api/invoices");
      const itemsWithKey = res.data.items.map((item: any) => ({
        ...item,
        key: item.id,
      }));
      setData(itemsWithKey);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch invoices", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7182/api/invoices/${id}`);
      showToast("Invoice deleted successfully!", "success");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to delete invoice", "error");
    }
  };

  const handleCreate = async (values: any) => {
    try {
      await axios.post("https://localhost:7182/api/invoices/create", values);
      showToast("Invoice created successfully!", "success");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to create invoice", "error");
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      if (!editingInvoice) throw new Error("No invoice selected to update");
      await axios.put(`https://localhost:7182/api/invoices/${editingInvoice.id}`, values);
      showToast("Invoice updated successfully!", "success");
      setEditingInvoice(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to update invoice", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  return {
    data,
    loading,
    editingInvoice,
    setEditingInvoice,
    refreshKey,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
