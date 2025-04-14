# Genpact Dashboard

A comprehensive dashboard application built with Next.js and React, designed to provide real-time data visualization and analytics for Genpact operations.

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Analytics**: Dynamic charts and graphs for data visualization
- **Collapsible Sidebar**: Toggle sidebar visibility for more screen space
- **Mobile Menu**: Enhanced navigation on smaller screens
- **Integrated Chatbot**: AI-powered assistant for user queries
- **Dark/Light Mode**: Support for different viewing preferences
- **Real-time Updates**: Live data synchronization

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **CSS Variables**: For consistent theming and styling
- **Chart.js**: For data visualization components
- **Context API**: For state management

## Project Structure

- `app/`: Next.js app directory containing page components
- `components/`: Reusable React components
- `public/`: Static assets like images and icons
- `styles/`: Global CSS and theme variables
- `utils/`: Helper functions and utilities
- `types/`: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/genpact-dashboard.git
cd genpact-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Development Guide

### Creating New Pages

1. **Page Creation**:
   - Create new pages in the `app/` directory
   - Each page should be a directory with a `page.tsx` file
   - Example structure:
     ```
     app/
     ├── dashboard/
     │   └── page.tsx
     ├── analytics/
     │   └── page.tsx
     └── settings/
         └── page.tsx
     ```

2. **Dynamic Routes**:
   - Use square brackets `[]` for dynamic routes
   - Example: `app/users/[id]/page.tsx`
   - Access parameters using `params` prop

3. **Layouts**:
   - Create shared layouts in `app/layout.tsx`
   - Use nested layouts for specific sections
   - Example: `app/dashboard/layout.tsx`

### API Routes

1. **Creating API Endpoints**:
   - Place API routes in `app/api/` directory
   - Each endpoint should have a `route.ts` file
   - Example: `app/api/users/route.ts`

2. **API Methods**:
   - Support for GET, POST, PUT, DELETE methods
   - Use Next.js API route handlers
   - Example:
     ```typescript
     export async function GET(request: Request) {
       // Handle GET request
     }
     ```

### Components

1. **Creating Components**:
   - Place reusable components in `components/` directory
   - Use TypeScript for type safety
   - Follow component naming conventions (PascalCase)

2. **Component Structure**:
   - Create separate directories for complex components
   - Include tests and stories if applicable
   - Example:
     ```
     components/
     ├── Button/
     │   ├── Button.tsx
     │   ├── Button.test.tsx
     │   └── Button.stories.tsx
     └── Card/
         ├── Card.tsx
         └── Card.types.ts
     ```

### Styling

1. **CSS Modules**:
   - Use CSS modules for component-specific styles
   - File naming: `ComponentName.module.css`
   - Import styles in components

2. **Global Styles**:
   - Use `styles/globals.css` for global styles
   - Define CSS variables in `styles/variables.css`
   - Follow BEM naming convention

### State Management

1. **Context API**:
   - Create contexts in `context/` directory
   - Use `useContext` hook for state access
   - Example: `context/ThemeContext.tsx`

2. **Data Fetching**:
   - Use `fetch` API or SWR for data fetching
   - Implement error handling and loading states
   - Cache responses when appropriate

### Testing

1. **Unit Tests**:
   - Write tests using Jest and React Testing Library
   - Place tests in `__tests__` directories
   - Follow test naming convention: `ComponentName.test.tsx`

2. **Integration Tests**:
   - Test page components and API routes
   - Use Cypress for end-to-end testing
   - Maintain test coverage reports

### Deployment

1. **Build Process**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Production Deployment**:
   - Use Vercel for easy deployment
   - Configure environment variables
   - Set up CI/CD pipeline

## Contributing

1. Create a new branch for your feature
2. Follow the code style guidelines
3. Write tests for new features
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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