import { useContext } from 'react';
import { RfqContext } from '../context/RfqContext';

export const useRfq = () => {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
};
