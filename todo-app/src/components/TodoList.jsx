import React from 'react';
import TodoItem from './TodoItem';
import useTodoStore from '../store/todoStore';
import { MESSAGES } from '../utils/constants';

const TodoList = ({ language = 'en' }) => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const searchQuery = useTodoStore((state) => state.searchQuery);

  // Filter and search todos
  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = filteredTodos.filter((t) => !t.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((t) => t.completed);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTodos = filteredTodos.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{MESSAGES[language]?.noTodos || MESSAGES['en'].noTodos}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} language={language} />
      ))}
    </div>
  );
};

export default TodoList;
