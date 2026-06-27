import { formatDistanceToNow, isPast, format, isToday, isTomorrow } from 'date-fns';
import { hi } from 'date-fns/locale';

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @param {string} language - Language code (en, hi)
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, language = 'en') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const locale = language === 'hi' ? hi : undefined;

  if (isToday(date)) return language === 'hi' ? 'आज' : 'Today';
  if (isTomorrow(date)) return language === 'hi' ? 'कल' : 'Tomorrow';

  return formatDistanceToNow(date, { addSuffix: true, locale });
};

/**
 * Check if task is overdue
 * @param {string} dueDate - ISO date string
 * @param {boolean} completed - Whether task is completed
 * @returns {boolean} True if task is overdue
 */
export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return isPast(new Date(dueDate));
};

/**
 * Get priority color classes
 * @param {string} priority - Priority level
 * @returns {object} Color classes
 */
export const getPriorityClasses = (priority) => {
  const classes = {
    high: { text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300', light: 'bg-red-50' },
    medium: { text: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300', light: 'bg-yellow-50' },
    low: { text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300', light: 'bg-green-50' },
  };
  return classes[priority] || classes.medium;
};

/**
 * Sort todos by specified criteria
 * @param {array} todos - Array of todos
 * @param {string} sortBy - Sort criteria
 * @returns {array} Sorted todos
 */
export const sortTodos = (todos, sortBy = 'dueDate') => {
  const sorted = [...todos];

  switch (sortBy) {
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'createdAt':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'favorites':
      return sorted.sort((a, b) => (b.isFavorite ? 1 : -1) - (a.isFavorite ? 1 : -1));
    default:
      return sorted;
  }
};

/**
 * Validate todo data
 * @param {object} todo - Todo object to validate
 * @returns {object} Validation result
 */
export const validateTodo = (todo) => {
  const errors = {};

  if (!todo.title || todo.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (todo.title && todo.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }

  if (todo.description && todo.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
    errors.dueDate = 'Due date cannot be in the past';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Get category info
 * @param {string} categoryId - Category ID
 * @returns {object} Category info
 */
export const getCategoryInfo = (categoryId, categories) => {
  return categories.find((cat) => cat.id === categoryId) || categories[categories.length - 1];
};

/**
 * Format number to percentage
 * @param {number} value - Number to format
 * @param {number} total - Total count
 * @returns {string} Percentage string
 */
export const formatPercentage = (value, total) => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};
