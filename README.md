# @zemenay/tech-solutions

[![npm version](https://img.shields.io/npm/v/@zemenay/tech-solutions.svg?style=flat-square)](https://www.npmjs.com/package/@zemenay/tech-solutions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of reusable React components and hooks for building modern web applications, extracted from the Zemenay Tech Solutions website.

## Installation

```bash
npm install @zemenay/tech-solutions
# or
yarn add @zemenay/tech-solutions
# or
pnpm add @zemenay/tech-solutions
```

## Usage

```tsx
import { Button, ThemeProvider } from '@zemenay/tech-solutions';

function App() {
  return (
    <ThemeProvider>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

## Features

- **Modern UI Components**: Pre-built, accessible components
- **Dark/Light Mode**: Built-in theme support
- **TypeScript Support**: Fully typed components
- **Customizable**: Easily themeable with CSS variables

## Documentation

For detailed documentation and examples, please visit our [documentation site](https://zemenay.tech/docs).

## Features

- **Modern UI/UX**: Clean and professional design with smooth animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Automatic theme switching based on user preferences
- **Interactive Elements**: Smooth animations using Framer Motion
- **SEO Optimized**: Built with Next.js for optimal SEO performance
- **Performance Optimized**: Optimized for fast loading and good Lighthouse scores

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui
- **State Management**: React Context
- **Theme Management**: Custom theme provider
- **Deployment**: Vercel

## Project Structure

```
zemenay-tech-solutions/
├── app/                    # App router directory
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── pricing/            # Pricing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── site-header.tsx     # Navigation header
│   ├── site-footer.tsx     # Footer component
│   ├── ui/                 # Shadcn/ui components
│   └── hero/               # Hero section components
├── lib/                    # Utility functions and configs
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Segniko/Zemenay-Tech-Solutions.git
   cd Zemenay-Tech-Solutions
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Features

### Home Page (`/`)
- Dynamic 3D globe animation with interactive elements
- Smooth scroll animations using Framer Motion
- Responsive layout with Tailwind CSS
- Interactive CTA buttons with hover effects

### About Page (`/about`)
- Company story with animated timeline
- Team member profiles with hover effects
- Core values display with icon cards
- Responsive statistics section

### Contact Page (`/contact`)
- Modern contact form with validation
- Interactive form fields with smooth animations
- Social media links with hover effects
- Responsive layout for all devices

### Pricing Page (`/pricing`)
- Clean pricing tables with feature comparison
- Toggle between monthly/yearly billing
- Hover effects on pricing cards
- Responsive design for all screen sizes

## Components

### Site Header
- Responsive navigation with mobile menu
- Theme toggle button
- Active link highlighting
- Smooth scroll behavior

### Site Footer
- Company information
- Quick links
- Social media icons
- Copyright information

### UI Components (Shadcn/ui)
- Button
- Card
- Input
- Textarea
- And more...

## Theming

The app supports both light and dark modes using CSS variables and the `next-themes` package. The theme can be toggled using the theme toggle button in the header.

## Deployment

The site is deployed on Vercel. Any push to the `main` branch will trigger a new deployment.

## Component & Page Documentation

### 🏠 Home Page (`/`)
The home page serves as the main landing page with an engaging hero section and key features.

**Key Components:**
- **Hero Section**: Features a dynamic 3D globe animation with a call-to-action button
- **Features Grid**: Showcases core services with icons and brief descriptions
- **Interactive Elements**: Smooth scroll animations and hover effects
- **Responsive Design**: Adapts to all screen sizes

**Technical Details:**
- Built with Framer Motion for animations
- Uses Next.js Image component for optimized images
- Implements responsive design with Tailwind CSS

### About Page (`/about`)
The about page provides information about the company, its values, and team members.

**Sections:**
1. **Company Story**
   - Timeline of company milestones
   - Core values with icon representations

2. **Team Section**
   - Team member profiles
   - Roles and responsibilities
   - Social media links

3. **Statistics**
   - Key metrics about the company
   - Animated counters for important figures

### Services Page (`/services`)
Displays the range of services offered by Zemenay Tech Solutions.

**Service Categories:**
- Web Development
- Mobile App Development
- UI/UX Design
- Cloud Solutions
- Maintenance & Support

**Features:**
- Service cards with icons
- Detailed service descriptions
- Call-to-action buttons for each service

### Pricing Page (`/pricing`)
Showcases pricing plans and packages.

**Pricing Tiers:**
- Basic
- Professional
- Enterprise

**Features:**
- Toggle between monthly/yearly billing
- Feature comparison table
- Highlighted recommended plan
- Clear call-to-action buttons

### Contact Page (`/contact`)
Allows users to get in touch with the company.

**Components:**
- Contact form with validation
- Company contact information
- Interactive map
- Social media links

**Form Fields:**
- Name
- Email
- Subject
- Message

### Header Component
Navigation bar that appears on all pages.

**Features:**
- Responsive design with mobile menu
- Active link highlighting
- Theme toggle button
- Company logo with link to home

### Footer Component
Appears at the bottom of all pages.

**Sections:**
- Company information
- Quick links
- Contact details
- Social media icons
- Copyright information

## Technical Implementation

### State Management
- Uses React Context for global state
- Local component state for UI interactions
- Form state management with React Hook Form

### Styling
- Tailwind CSS for utility-first styling
- Custom animations with Framer Motion
- Responsive design patterns

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized animations for smooth performance

## Best Practices

### Code Organization
- Components are organized by feature
- Reusable UI components in separate directory
- Custom hooks for shared logic

### Accessibility
- Semantic HTML5 elements
- ARIA labels where necessary
- Keyboard navigation support
- Color contrast compliance

## Made By

- [Segniko](https://github.com/Segniko)
- [Nahom Brook](https://github.com/NahomBrook)