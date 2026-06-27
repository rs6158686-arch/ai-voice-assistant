import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { FiCheckCircle2, FiCircle } from 'react-icons/fi';
import useTodoStore from '../store/todoStore';
import { formatDate, isOverdue, getPriorityClasses } from '../utils/helpers';
import { CATEGORIES, PRIORITY_LEVELS } from '../utils/constants';

const TodoItem = ({ todo, language = 'en' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const { toggleTodo, updateTodo, deleteTodo, toggleFavorite } = useTodoStore();

  const handleEdit = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  const category = CATEGORIES.find((c) => c.id === todo.category);
  const priority = PRIORITY_LEVELS[todo.priority];
  const overdue = isOverdue(todo.dueDate, todo.completed);
  const priorityClasses = getPriorityClasses(todo.priority);

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg transition-smooth ${
        todo.completed
          ? 'bg-gray-50 border-gray-200 opacity-70'
          : 'bg-white border-gray-200 hover:shadow-md'
      } ${overdue && !todo.completed ? 'border-red-300 bg-red-50' : ''}`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className="mt-1 text-gray-400 hover:text-blue-600 transition-smooth flex-shrink-0"
      >
        {todo.completed ? (
          <FiCheckCircle2 size={24} className="text-green-600" />
        ) : (
          <FiCircle size={24} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        ) : (
          <>
            {/* Title */}
            <p
              className={`font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {todo.title}
            </p>

            {/* Description */}
            {todo.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{todo.description}</p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              {/* Priority Badge */}
              <span
                className={`px-2 py-1 rounded-full font-medium ${priorityClasses.bg} ${priorityClasses.text}`}
              >
                {priority.label}
              </span>

              {/* Category Badge */}
              {category && (
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {category.icon} {category.label}
                </span>
              )}

              {/* Due Date */}
              {todo.dueDate && (
                <span
                  className={`px-2 py-1 rounded-full ${
                    overdue && !todo.completed
                      ? 'bg-red-100 text-red-700 font-bold'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  📅 {formatDate(todo.dueDate, language)}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(todo.id)}
          className={`p-2 rounded hover:bg-yellow-100 transition-smooth ${
            todo.isFavorite ? 'text-yellow-500' : 'text-gray-400'
          }`}
          title="Toggle favorite"
        >
          <FiStar size={18} fill={todo.isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-smooth"
          title="Edit"
        >
          <FiEdit2 size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="p-2 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-smooth"
          title="Delete"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
