# React + Vite

# 📅 TaskPlanner - Simplified Month View Task Planner

A modern, responsive task planner with drag & drop functionality, built with React, Vite, Chakra UI, and Tailwind CSS. Features a clean Google Calendar-like interface optimized for both desktop and mobile devices.



## ✨ Features

### 🗓️ **Calendar Management**
- **Month View**: Clean grid layout showing the full month
- **Navigation**: Previous/next month navigation with "Today" button
- **Today Highlighting**: Current date highlighted with blue indicator
- **Responsive Design**: Adapts perfectly to mobile and desktop screens

### 📋 **Task Management**
- **Create Tasks**: Click any day to create new tasks
- **Edit Tasks**: Click existing tasks to modify details
- **Delete Tasks**: Remove tasks through the edit dialog
- **Task Categories**: Work, Personal, Health, Education, Social with color coding
- **Priority Levels**: Low, Medium, High with visual indicators and color coding

### 🎨 **Visual Design**
- **Priority Colors**: 
  - 🔴 High Priority (Red) - Immediate attention
  - 🟡 Medium Priority (Yellow) - Moderate attention  
  - 🟢 Low Priority (Green) - Low attention
- **Category Indicators**: Color-coded dots for quick category identification
- **Dark Mode Support**: Full light/dark theme switching
- **Clean UI**: Modern card-based design with smooth animations

### 📱 **Mobile Optimization**
- **Responsive Layout**: Mobile-first design approach
- **Touch-Friendly**: Optimized for touch interactions
- **Compact View**: Shows priority indicators instead of full task details
- **Task List Modal**: Tap days to view tasks in a clean popup
- **Mobile Drag & Drop**: Full touch-based drag and drop support

### 🔍 **Filtering & Search**
- **Category Filter**: Filter tasks by category
- **Priority Filter**: Filter by task priority
- **Real-time Updates**: Instant filtering without page refresh
- **Clear Filters**: Quick reset option

### 🖱️ **Drag & Drop**
- **Desktop**: Traditional mouse drag and drop
- **Mobile**: Touch-based drag with visual preview
- **Cross-Device**: Seamless experience on all devices
- **Visual Feedback**: Drag preview and hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- yarn or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/hisrael01/taskplanner.git
   cd taskplanner
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   yarn install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   yarn run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:5173` or `http://localhost:5173`

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server

### **UI Libraries**
- **Chakra UI** - Modular and accessible component library
- **Tailwind CSS** - Utility-first CSS framework for custom styling

### **Key Dependencies**
\`\`\`json
{
  "react": "^18.2.0",
  "@chakra-ui/react": "^2.8.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "framer-motion": "^10.16.0",
  "tailwindcss": "^3.3.0"
}
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── TaskModal.jsx    # Task creation/editing modal
│   ├── TaskListModal.jsx # Mobile task list display
│   ├── TaskIndicators.jsx # Task display logic
│   └── FilterSection.jsx # Filter controls
├── hooks/               # Custom React hooks
│   ├── useTaskPlanner.js # Task and calendar management
│   └── useDragAndDrop.js # Drag & drop functionality
├── utils/               # Utility functions
│   └── calendarUtils.js # Calendar calculations
├── constants/           # App constants
│   └── taskConstants.js # Categories, colors, etc.
├── pages/           # App constants
    └── task-planner.jsx  # Main component
\`\`\`

## 🎯 Usage

### **Creating Tasks**
1. Click on any calendar day
2. Fill in task details (title, description, category, priority)
3. Click "Create" to save

### **Managing Tasks**
- **Edit**: Click on any task to modify
- **Delete**: Use the delete button in the edit modal
- **Move**: Drag tasks between different days

### **Mobile Usage**
- **View Tasks**: Tap on days with task indicators
- **Create Tasks**: Tap on empty days
- **Drag Tasks**: Long press and drag to move tasks

### **Filtering**
1. Click the "Filters" button
2. Select category and/or priority
3. Click "Clear" to reset filters

## 🎨 Customization

### **Adding New Categories**
Edit `src/constants/taskConstants.js`:
\`\`\`javascript
export const CATEGORIES = [
  { name: 'Work', color: 'blue' },
  { name: 'Personal', color: 'green' },
  { name: 'YourCategory', color: 'purple' }, // Add here
]
\`\`\`

### **Modifying Colors**
Update priority colors in `src/constants/taskConstants.js`:
\`\`\`javascript
export const PRIORITY_TASK_COLORS = {
  low: {
    light: 'green.50',
    dark: 'green.900',
    // ... customize colors
  }
}
\`\`\`

### **Styling**
- **Chakra UI**: Modify component props for consistent theming
- **Tailwind CSS**: Add custom utilities in `tailwind.config.js`
- **Dark Mode**: Colors automatically adapt using `useColorModeValue`

## 📱 Responsive Breakpoints

\`\`\`javascript
// Mobile: base to sm (0px - 767px)
// Desktop: md and up (768px+)

const isMobile = useBreakpointValue({ base: true, md: false })
\`\`\`

## 🔧 Development

### **Available Scripts**
\`\`\`bash
yarn run dev          # Start development server
yarn run build        # Build for production
yarn run preview      # Preview production build
yarn run lint         # Run ESLint
\`\`\`

### **Code Organization**
- **Hooks**: Custom logic in `src/hooks/`
- **Components**: Reusable UI in `src/components/`
- **Utils**: Pure functions in `src/utils/`
- **Constants**: Configuration in `src/constants/`

### **Adding New Features**
1. Create custom hooks for complex logic
2. Build reusable components
3. Add constants for configuration
4. Update main component to integrate

## 🌙 Dark Mode

TaskPlanner includes full dark mode support:
- **Toggle**: Available in the navbar
- **Persistence**: Mode preference saved automatically
- **Adaptive Colors**: All components respect color mode
- **Smooth Transitions**: Seamless switching experience

## 📦 Build & Deployment

### **Production Build**
\`\`\`bash
yarn run build
\`\`\`


## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chakra UI** - For the excellent component library
- **Tailwind CSS** - For utility-first styling
- **Vite** - For the fast development experience
- **React** - For the powerful UI framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/hisrael01/taskplanner/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hisrael01/taskplanner/discussions)
- **Email**: hisraelyt19@gmail.com

---

**Made with ❤️ by Israel Olaide**

*TaskPlanner - Simplify your task management with style!*
