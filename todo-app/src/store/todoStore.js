import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useTodoStore = create((set, get) => ({
  todos: [],
  filter: 'all',
  searchQuery: '',
  theme: 'light',
  language: 'en',

  // Initialize todos from localStorage
  initializeTodos: () => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        set({ todos: JSON.parse(stored) });
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  },

  // Add a new todo
  addTodo: (todoData) => {
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      priority: todoData.priority || 'medium',
      category: todoData.category || 'general',
      tags: todoData.tags || [],
      dueDate: todoData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      isFavorite: false,
    };

    set((state) => {
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Update a todo
  updateTodo: (id, updates) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Delete a todo
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Toggle todo completion
  toggleTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null,
            }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Toggle favorite
  toggleFavorite: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Clear completed todos
  clearCompleted: () => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  // Get filtered and searched todos
  getFilteredTodos: () => {
    const state = get();
    const { todos, filter, searchQuery } = state;

    return todos.filter((todo) => {
      // Filter by status
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  },

  // Set filter
  setFilter: (filter) => set({ filter }),

  // Set search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Toggle theme
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },

  // Get statistics
  getStatistics: () => {
    const state = get();
    const { todos } = state;
    const completed = todos.filter((t) => t.completed).length;

    return {
      total: todos.length,
      completed,
      active: todos.length - completed,
      completionRate: todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0,
      byPriority: {
        high: todos.filter((t) => t.priority === 'high' && !t.completed).length,
        medium: todos.filter((t) => t.priority === 'medium' && !t.completed).length,
        low: todos.filter((t) => t.priority === 'low' && !t.completed).length,
      },
      favorites: todos.filter((t) => t.isFavorite).length,
    };
  },

  // Export todos as JSON
  exportTodos: () => {
    const state = get();
    const dataStr = JSON.stringify(state.todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  },

  // Import todos from JSON
  importTodos: (jsonData) => {
    try {
      const importedTodos = JSON.parse(jsonData);
      set({ todos: importedTodos });
      localStorage.setItem('todos', JSON.stringify(importedTodos));
      return true;
    } catch (error) {
      console.error('Error importing todos:', error);
      return false;
    }
  },

  // Clear all todos
  clearAllTodos: () => {
    set({ todos: [] });
    localStorage.removeItem('todos');
  },
}));

export default useTodoStore;
