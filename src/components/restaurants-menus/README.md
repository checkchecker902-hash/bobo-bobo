# Restaurant Menus Page Components

This directory contains high-level page components that use the UI components to create complete restaurant menu experiences.

## Components

### MenusPage
A complete restaurant menu page with sample data including:
- **3 Menu Types**: Dinner Menu, Lunch Specials, Weekend Brunch
- **4 Sections**: Appetizers, Main Courses, Desserts, Beverages
- **12 Items**: Variety of dishes with descriptions and prices

### MenusPageExample
A comprehensive showcase with premium restaurant data including:
- **3 Menu Types**: Fine Dining Experience, Business Lunch, Weekend Brunch
- **7 Sections**: Appetizers, Salads, Pasta, Seafood, Meat & Poultry, Desserts, Beverages
- **16 Items**: High-end dishes with detailed descriptions

## Usage

### Basic Usage
```tsx
import { MenusPage } from './components/restaurants-menus';

const App = () => {
  return <MenusPage />;
};
```

### Advanced Usage
```tsx
import { MenusPageExample } from './components/restaurants-menus';

const App = () => {
  return <MenusPageExample />;
};
```

### Custom Implementation
```tsx
import { Menus } from './components/ui/restaurants-menus';
import { Menu, MenuSection, MenuItem } from './types';

const MyCustomMenusPage = () => {
  const menus: Menu[] = [
    {
      id: 'menu-1',
      name: 'My Restaurant Menu',
      description: 'Custom menu description',
      sectionIds: ['section-1']
    }
  ];

  const sections: MenuSection[] = [
    {
      id: 'section-1',
      name: 'My Section',
      description: 'Section description',
      itemIds: ['item-1']
    }
  ];

  const items: MenuItem[] = [
    {
      id: 'item-1',
      name: 'My Item',
      description: 'Item description',
      price: 15.99
    }
  ];

  return (
    <Menus 
      menus={menus} 
      sections={sections} 
      items={items} 
    />
  );
};
```

## Features

- **Responsive Design**: Works on all device sizes
- **Clean Layout**: Modern, professional appearance
- **Type Safety**: Full TypeScript support
- **Flexible Data**: Easy to customize with your own menu data
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized React components

## Styling

Both page components use Tailwind CSS for styling and include:
- Gradient backgrounds for visual appeal
- Proper spacing and typography
- Responsive containers
- Clean, modern design patterns