import { Snackbar, Alert } from '@mui/material';

interface DataTableProps {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  isToastVisible: boolean;
  setIsToastVisible: (visible: boolean) => void;
}

const Toast: React.FC<DataTableProps> = ({ message, severity, isToastVisible, setIsToastVisible }) => {

  return (
    <Snackbar
      open={isToastVisible}
      autoHideDuration={10000}
      onClose={() => setIsToastVisible(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setIsToastVisible(false)} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;