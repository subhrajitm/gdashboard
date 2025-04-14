# Genpact Dashboard

A modern dashboard application built with Next.js and TypeScript.

## Features

- **Interactive Dashboard**: Real-time data visualization and analytics
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Built-in theme support
- **Modern UI**: Clean and intuitive user interface
- **SMBA Assistant**: AI-powered chatbot for assistance

## SMBA Assistant Chatbot

The SMBA Assistant is an interactive chatbot component that provides real-time assistance and information. It features:

- **Multiple View Modes**:
  - Normal mode: Compact chat window
  - Maximized mode: Full-screen chat interface
  - Docked mode: Sidebar-style chat interface

- **Interactive Features**:
  - Real-time messaging
  - Message history
  - Auto-scrolling to latest messages
  - Resizable interface (in docked mode)

- **Modern Design**:
  - Clean and intuitive interface
  - Status indicators
  - Smooth animations
  - Responsive layout

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/genpact-dashboard.git
```

2. Install dependencies:
```bash
cd genpact-dashboard
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
genpact-dashboard/
├── components/         # Reusable UI components
│   ├── ChatBot.tsx    # SMBA Assistant chatbot
│   └── ...
├── context/           # React context providers
├── public/            # Static assets
└── ...
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React Context API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Data Management

1. **Data Structure**:
   - `src/data/types/`: TypeScript interfaces for data models
   - `src/data/mock/`: Mock data for development
   - `src/data/services/`: Data fetching services

2. **Using Data in Components**:
   ```typescript
   import { getDashboardMetrics } from '@/data/services/dashboardService';
   
   // In your component
   const metrics = await getDashboardMetrics();
   ```

3. **Data Flow**:
   - Components fetch data through service layer
   - Services handle API calls and data transformation
   - Mock data available for development
   - Easy to switch between mock and real data