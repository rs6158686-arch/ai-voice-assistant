# 📝 Modern To-Do List Application

A beautiful, feature-rich to-do list application with local storage functionality.

## ✨ Features

### Core Features
- ✅ Add, edit, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Local storage persistence
- ✅ Real-time search and filter
- ✅ Task categories/tags
- ✅ Priority levels (High, Medium, Low)
- ✅ Due dates with reminders
- ✅ Task statistics
- ✅ Dark/Light theme
- ✅ Keyboard shortcuts

### Advanced Features
- 📊 Dashboard with analytics
- 🏷️ Categories and tags
- ⭐ Favorite tasks
- 📅 Calendar view
- 🔍 Smart search
- 🎨 Customizable themes
- 🌍 Multi-language support (English, Hindi)
- 📱 Responsive design
- ♿ Accessibility features
- 🎯 Productivity analytics

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Icons
- Zustand (State Management)
- Local Storage API

### Backend (Optional)
- Flask/FastAPI
- SQLite
- REST API

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+ (optional, for backend)

### Setup

```bash
# Clone repository
git clone https://github.com/rs6158686-arch/ai-voice-assistant.git
cd ai-voice-assistant/todo-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 🚀 Usage

### Adding a Task
1. Type task description in input field
2. (Optional) Set priority, due date, category
3. Press Enter or click Add button

### Managing Tasks
- **Complete**: Click checkbox or task
- **Edit**: Click edit icon
- **Delete**: Click trash icon
- **Favorite**: Click star icon

### Filtering & Searching
- Use search bar to find tasks
- Filter by status (All, Active, Completed)
- Filter by priority
- Filter by category

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | New task |
| `Ctrl + E` | Edit selected task |
| `Ctrl + D` | Delete selected task |
| `Ctrl + F` | Focus search |
| `Ctrl + T` | Toggle theme |

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── Filter.jsx
│   │   ├── Search.jsx
│   │   ├── Statistics.jsx
│   │   └── Theme.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTodos.js
│   │   └── useKeyboardShortcuts.js
│   ├── store/
│   │   └── todoStore.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## 💾 Local Storage Schema

```javascript
{
  "todos": [
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
      "priority": "high", // high, medium, low
      "category": "work",
      "tags": ["important", "urgent"],
      "dueDate": "2024-01-15",
      "createdAt": "2024-01-10T10:30:00Z",
      "completedAt": null,
      "isFavorite": false
    }
  ],
  "settings": {
    "theme": "light",
    "language": "en",
    "sortBy": "dueDate",
    "filterBy": "all"
  }
}
```

## 🎨 Customization

### Theme
Edit `src/utils/constants.js`:
```javascript
export const THEMES = {
  light: { /* colors */ },
  dark: { /* colors */ }
};
```

### Categories
```javascript
export const CATEGORIES = [
  'work',
  'personal',
  'shopping',
  'health',
  'finance'
];
```

## 📊 Statistics

The app provides:
- Total tasks count
- Completed tasks count
- Completion rate
- Tasks by priority
- Tasks by category
- Overdue tasks

## 🔐 Data Privacy

- All data stored locally in browser
- No data sent to servers
- Optional export/import functionality
- One-click data backup

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json:
# "homepage": "https://username.github.io/ai-voice-assistant"
npm run build
npm run deploy
```

### Deploy to Netlify
```bash
# Connect your GitHub repo to Netlify
# Set build command: npm run build
# Set publish directory: build
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project

## 🙏 Support

If you find this project helpful, please star it on GitHub!

## 📞 Contact

- GitHub: [@rs6158686-arch](https://github.com/rs6158686-arch)
- Repository: [ai-voice-assistant](https://github.com/rs6158686-arch/ai-voice-assistant)

---

Made with ❤️ for productivity
