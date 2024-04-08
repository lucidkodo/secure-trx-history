import { useState, useCallback } from 'react';
import { getNewTransactions } from '../../../services/api';
import { TransactionDetails } from '../../../models/Transaction';
import { useErrorBoundary } from 'react-error-boundary';

export default function useRefresh() {
  const { showBoundary } = useErrorBoundary();

  const [refreshing, setRefreshing] = useState(false);
  const [newTransactions, setNewTransactions] = useState<TransactionDetails[]>(
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchNewTrx();
    }, 1500);
  }, []);

  function fetchNewTrx() {
    getNewTransactions()
      .then((res) => {
        setNewTransactions(res);
      })
      .catch((e) => {
        showBoundary(e);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }

  return { refreshing, onRefresh, newTransactions };
}
