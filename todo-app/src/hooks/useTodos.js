import { useEffect } from 'react';
import useTodoStore from '../store/todoStore';

/**
 * Custom hook for managing todos
 * Initializes todos from localStorage on component mount
 */
function useTodos() {
  const store = useTodoStore();

  useEffect(() => {
    store.initializeTodos();
  }, []);

  return store;
}

export default useTodos;
