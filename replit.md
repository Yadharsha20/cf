# CleverFlux - replit.md

## Overview

CleverFlux is a modern tech studio website built with React and Express.js. The company specializes in MVP development, smart POS systems, full-stack tech support, and no-code/low-code integrations. CleverFlux helps founders, creators, and small businesses turn raw ideas into fully functional digital products — fast, scalable, and beautiful. The website features a modern black and white design with enhanced graphics and professional styling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom CleverFlux theme
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Build Tool**: Vite for development and production builds
- **Animations**: Framer Motion for smooth interactions

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for API server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Setup
- **Monorepo Structure**: Shared types and schemas between client and server
- **Development Server**: TSX for TypeScript execution in development
- **Build Process**: Vite for client, esbuild for server bundling

## Key Components

### Database Schema
Located in `shared/schema.ts` with three main entities:
- **Users**: Authentication system with username/password
- **Contacts**: Contact form submissions with project details
- **Newsletter Subscriptions**: Email subscription management

### API Routes
- `POST /api/contact` - Contact form submission
- `GET /api/contacts` - Retrieve all contacts (admin)
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/newsletter` - Retrieve subscriptions (admin)

### Client Pages
- **Home**: Landing page with hero section and service overview
- **Services**: Detailed service offerings (Build, Launch, Iterate)
- **About**: Company story and team information
- **Blog**: Content hub with categorized insights
- **Portfolio**: Project showcase with case studies
- **Contact**: Contact form and business information

### UI System
- **Theme**: Custom CleverFlux brand colors with light/dark mode support
- **Components**: Comprehensive UI library using Radix primitives
- **Responsive**: Mobile-first design with floating CTA
- **Forms**: React Hook Form with Zod validation

## Data Flow

### Contact Form Flow
1. User fills contact form with validation
2. Client submits via TanStack Query mutation
3. Server validates with Zod schema
4. Data stored in PostgreSQL via Drizzle ORM
5. Success/error feedback via toast notifications

### Newsletter Subscription Flow
1. User enters email in footer or dedicated forms
2. Client-side validation and submission
3. Server checks for duplicate subscriptions
4. Stores unique subscriptions with timestamps
5. Provides appropriate user feedback

### Content Management
- Static content managed through React components
- SEO optimization with dynamic meta tag management
- Blog content structured for future CMS integration

## External Dependencies

### Core Dependencies
- **@radix-ui/react-***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL database connection
- **wouter**: Lightweight React router
- **framer-motion**: Animation library

### Development Tools
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast development server and bundler
- **ESBuild**: Fast server bundling for production

### Validation & Forms
- **zod**: Schema validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Zod integration for forms

## Deployment Strategy

### Replit Configuration
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module enabled
- **Development**: `npm run dev` starts both client and server
- **Production Build**: Vite builds client, esbuild bundles server
- **Deployment**: Autoscale deployment target

### Environment Setup
- **Development**: TSX with hot reload via Vite
- **Production**: Compiled JavaScript with static file serving
- **Database**: Drizzle migrations for schema management
- **Port Configuration**: Server runs on port 5000

### Build Process
1. Client builds to `dist/public` via Vite
2. Server bundles to `dist/index.js` via esbuild
3. Static files served from built client directory
4. Database migrations applied via `npm run db:push`

## Recent Changes
- June 21, 2025: Complete website transformation to reflect CleverFlux's actual business model and products
- Updated all content to showcase real products: ZAZ AI (POS system) and RecruitPal (recruitment platform)
- Integrated ZAZ AI logo and product branding throughout the site
- Portfolio page redesigned to feature actual CleverFlux products and services
- Home page updated with ZAZ AI and RecruitPal product showcases
- Created comprehensive signup page for free trial with detailed form collection
- Updated navigation: "Start Free Trial" → /signup, "View Demo" → /portfolio
- Implemented modern black and white design with Space Grotesk typography
- Enhanced hero sections with floating graphics, animated statistics, and modern card layouts
- All pages updated with correct business messaging and professional styling

## Changelog
- June 21, 2025. Initial setup and complete modern redesign

## User Preferences

Preferred communication style: Simple, everyday language.