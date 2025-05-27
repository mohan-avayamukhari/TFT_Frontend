import { useState } from "react";
import Header from "./components/Header";
import FormSection from "./components/FormSection";
import DataTable from "./components/DataTable";
import axios from "axios";

const App = () => {
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = async (values: any) => {
    try {
      await axios.post("https://localhost:7182/api/invoices/create", values);
      alert("Invoice created successfully!");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      console.log("Updating invoice with values:", editingInvoice);
      await axios.put(`https://localhost:7182/api/invoices/${editingInvoice.id}`, values);
      alert("Invoice updated successfully!");
      setEditingInvoice(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to update invoice");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <Header />
      <div className="border rounded-lg bg-white p-2 shadow">
        <FormSection
          initialValues={editingInvoice}
          onSubmit={editingInvoice ? handleUpdate : handleCreate}
        />
        <DataTable
          onEdit={(invoice: any) => setEditingInvoice(invoice)}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
};

export default App;
