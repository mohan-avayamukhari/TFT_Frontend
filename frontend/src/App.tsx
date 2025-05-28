import { useState } from "react";
import Header from "./components/Header";
import FormSection from "./components/FormSection";
import DataTable from "./components/DataTable";
import Toast from "./components/Toast";
import { Invoices } from "./hooks/Invoices";


const App = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error" | "warning" | "info">("success");

  const {
    editingInvoice,
    setEditingInvoice,
    refreshKey,
    handleCreate,
    handleUpdate,
    handleDelete
  } = Invoices(setToastMessage, setToastSeverity, setIsToastVisible);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <Header />
      <FormSection
        initialValues={editingInvoice}
        onSubmit={editingInvoice ? handleUpdate : handleCreate}
      />
      <DataTable
        onEdit={(invoice: any) => setEditingInvoice(invoice)}
        onDelete={handleDelete}
        refreshKey={refreshKey}
      />
      <Toast
        message={toastMessage}
        severity={toastSeverity}
        isToastVisible={isToastVisible}
        setIsToastVisible={setIsToastVisible}
      />
    </div>
  );
};

export default App;