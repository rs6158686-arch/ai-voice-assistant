// Priority levels
export const PRIORITY_LEVELS = {
  high: { label: 'High', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300' },
  medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  low: { label: 'Low', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' },
};

// Categories
export const CATEGORIES = [
  { id: 'work', label: 'Work', icon: '💼', color: 'bg-blue-500' },
  { id: 'personal', label: 'Personal', icon: '👤', color: 'bg-purple-500' },
  { id: 'shopping', label: 'Shopping', icon: '🛒', color: 'bg-green-500' },
  { id: 'health', label: 'Health', icon: '🏥', color: 'bg-red-500' },
  { id: 'finance', label: 'Finance', icon: '💰', color: 'bg-yellow-500' },
  { id: 'learning', label: 'Learning', icon: '📚', color: 'bg-indigo-500' },
  { id: 'general', label: 'General', icon: '📝', color: 'bg-gray-500' },
];

// Filter options
export const FILTER_OPTIONS = [
  { id: 'all', label: 'All Tasks', count: null },
  { id: 'active', label: 'Active', count: null },
  { id: 'completed', label: 'Completed', count: null },
];

// Sort options
export const SORT_OPTIONS = [
  { id: 'dueDate', label: 'Due Date' },
  { id: 'priority', label: 'Priority' },
  { id: 'createdAt', label: 'Created Date' },
  { id: 'title', label: 'Title A-Z' },
  { id: 'favorites', label: 'Favorites' },
];

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  'ctrl+n': 'New task',
  'ctrl+f': 'Focus search',
  'ctrl+t': 'Toggle theme',
  'ctrl+l': 'Clear completed',
};

// Messages
export const MESSAGES = {
  en: {
    noTodos: '✨ No tasks yet! Create one to get started.',
    noResults: '🔍 No tasks found. Try a different search.',
    taskAdded: '✅ Task added successfully!',
    taskUpdated: '✏️ Task updated!',
    taskDeleted: '🗑️ Task deleted!',
    taskCompleted: '🎉 Task completed!',
    allCompleted: '🎊 All tasks completed! Great job!',
    confirmDelete: 'Are you sure you want to delete this task?',
    confirmClear: 'Are you sure you want to clear all completed tasks?',
  },
  hi: {
    noTodos: '✨ अभी कोई कार्य नहीं! शुरू करने के लिए एक बनाएं।',
    noResults: '🔍 कोई कार्य नहीं मिला। अलग खोज करने का प्रयास करें।',
    taskAdded: '✅ कार्य सफलतापूर्वक जोड़ा गया!',
    taskUpdated: '✏️ कार्य अपडेट किया गया!',
    taskDeleted: '🗑️ कार्य हटाया गया!',
    taskCompleted: '🎉 कार्य पूरा हुआ!',
    allCompleted: '🎊 सभी कार्य पूरे हो गए! शानदार काम!',
    confirmDelete: 'क्या आप इस कार्य को हटाना चाहते हैं?',
    confirmClear: 'क्या आप सभी पूर्ण कार्यों को साफ करना चाहते हैं?',
  },
};
