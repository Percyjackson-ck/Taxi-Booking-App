# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Uber Frontend Documentation

This document describes the React frontend application built with Vite for the Uber clone project.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Pages](#pages)
- [Components](#components)
- [Context](#context)
- [Setup and Installation](#setup-and-installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

---

# Project Overview

A React-based frontend application for an Uber clone built with:
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

---

# Pages

## User Pages

### Start Page
**Route:** `/`
- Landing page with options to sign up as User or Captain
- Entry point for the application

### User Signup
**Route:** `/signup`
- User registration form with fullname, email, and password fields
- Redirects to user home after successful registration

### User Login
**Route:** `/login`
- User authentication with email and password
- Sets JWT token and redirects to user home

### User Home
**Route:** `/home`
- Main user dashboard for booking rides
- Pickup and destination input fields
- Location search with autocomplete
- Vehicle selection panel
- Real-time ride tracking

### User Logout
**Route:** `/users/logout`
- Logs out user and clears authentication
- Redirects to start page

### Riding
**Route:** `/riding`
- Active ride screen for users
- Shows ride details and live tracking
- Driver information and vehicle details

---

## Captain Pages

### Captain Signup
**Route:** `/captain-signup`
- Captain registration with personal and vehicle details
- Vehicle information including type, color, plate, and capacity

### Captain Login
**Route:** `/captain-login`
- Captain authentication with email and password
- Sets JWT token and redirects to captain home

### Captain Home
**Route:** `/captain-home`
- Captain dashboard showing available ride requests
- Accept/decline ride functionality
- Real-time location updates

### Captain Logout
**Route:** `/captain/logout`
- Logs out captain and clears authentication
- Redirects to start page

### Captain Riding
**Route:** `/captain-riding`
- Active ride screen for captains
- User information and ride details
- Navigation and ride completion options

---

## Protected Routes

### User Protected Wrapper
- Protects user routes requiring authentication
- Redirects to login if no valid token

### Captain Protected Wrapper
- Protects captain routes requiring authentication
- Redirects to captain login if no valid token

---

# Components

## Core Components

### LocationSearchPanel
- Displays location suggestions from map API
- Handles pickup and destination selection
- Integrates with Google Maps/location services

### VehiclePanel
- Shows available vehicle types (car, motorcycle, auto)
- Displays fare estimates for each vehicle type
- Vehicle selection functionality

### ConfirmRide
- Ride confirmation screen with trip details
- Pickup and destination addresses
- Final fare and vehicle information

### ConfirmRidePopUp
- Modal for ride confirmation
- Used by captains to accept rides
- Shows user details and trip information

### RidePopUp
- Displays incoming ride requests for captains
- Accept/decline functionality
- User pickup location and destination

### LookingForDriver
- Loading screen while searching for available drivers
- Cancel ride functionality
- Real-time updates on driver search

### WaitingForDriver
- Screen shown after driver accepts ride
- Driver details and vehicle information
- Estimated arrival time

### LiveTracking
- Real-time GPS tracking component
- Shows current location and route
- Used during active rides

### FinishRide
- Ride completion screen
- Payment summary and receipt
- Rating functionality

### CaptainDetails
- Displays captain profile information
- Vehicle details and ratings
- Used in various captain-related screens

---

# Context

## UserContext
**File:** `src/context/UserContext.jsx`
- Manages user authentication state
- Stores user profile information
- Provides user data across components

```jsx
const { user, setUser } = useContext(UserDataContext);
```

## CaptainContext
**File:** `src/context/CaptainContext.jsx`
- Manages captain authentication state
- Stores captain profile and vehicle information
- Provides captain data across components

## SocketContext
**File:** `src/context/SocketContext.jsx`
- Manages Socket.IO connection
- Provides real-time communication functions
- Handles events for ride updates and location tracking

```jsx
const { sendMessage, onMessage } = useContext(SocketContext);
```

---

# Setup and Installation

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

---

# Available Scripts

## Development
```bash
npm run dev
```
- Starts the development server with hot reload
- Available at `http://localhost:5173`

## Build
```bash
npm run build
```
- Creates optimized production build
- Output in `dist/` directory

## Preview
```bash
npm run preview
```
- Preview production build locally

## Lint
```bash
npm run lint
```
- Run ESLint to check code quality

---

# Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Required Variables

- `VITE_BASE_URL` - Backend API base URL
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key for location services

---

# Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── context/            # React Context providers
├── images/             # Static image assets
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

---

# Key Features

## Real-time Communication
- Socket.IO integration for live updates
- Real-time location tracking
- Instant ride notifications

## Authentication
- JWT-based authentication
- Protected routes for users and captains
- Automatic token refresh

## Location Services
- Google Maps integration
- Autocomplete location search
- GPS tracking and navigation

## Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Cross-platform compatibility

---

# API Integration

The frontend communicates with the backend through:
- **REST API** - User/Captain auth, ride management
- **Socket.IO** - Real-time features and live tracking
- **Google Maps API** - Location services and routing

---

# Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

# Contributing

1. Follow the existing code structure
2. Use TypeScript for new components (if migrating)
3. Ensure responsive design
4. Test on multiple devices
5. Follow ESLint rules

---

**Note:** This frontend application requires the backend API to be running for full functionality. Refer to the backend README for setup