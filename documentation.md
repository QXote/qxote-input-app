# Qxote Input App Documentation

## Overview

The Qxote Input App is designed for collecting flora and fauna data on the Qxote property. It provides a digital interface to replace manual data collection, enabling more efficient and accurate data capture.

## Current Application Status

### Purpose

To easily note down and keep track of specific flora and fauna on the Qxote property.

### Development Context

This app was originally developed during a hackathon-style event. As a result, the current codebase is prototype-level, with incomplete features and meh code quality. While functional in concept, it is not production-ready and requires significant refinement.

### Technology Stack (Current)

- **React**: Frontend framework
- **ShadCN**: UI component library
- **Vite**: Build tool and development server
- **Vite-PWA**: Progressive Web App (PWA) functionality
- **TypeScript**: Present but not consistently implemented

### Current Limitations

#### Technical Debt

- Incomplete TypeScript integration
- Limited modularity and code maintainability
- Lack of testing and error handling

#### Missing Functionality

- **Database integration**: No persistent storage — data isn't sent or saved to a backend
- **Multi-zone plots**: Plots currently do not support multiple zones

---

## Recommended Architecture for Rewrite

To address the current shortcomings, a full rebuild using a modern, modular architecture is recommended.

### Proposed Technology Stack

#### Frontend

- [React](https://react.dev/) with [React Router](https://reactrouter.com/) for routing
- [Vite](https://vite.dev/) as the build tool with [Vite-PWA](https://vite-pwa-org.netlify.app/) for PWA capabilities
- [Workbox](https://developer.chrome.com/docs/workbox) for advanced offline support
- [ShadCN](https://ui.shadcn.com/) as the component/UI framework
- [Prettier](https://prettier.io/) for consistent code formatting

#### Backend

- [Laravel](https://laravel.com/) with [Sail](https://laravel.com/docs/sail#main-content) for local Docker development
- [Laravel Pint](https://laravel.com/docs/pint#main-content) for code formatting and linting

#### Development & Deployment

- [Docker](https://www.docker.com/) for reproducible local development
- [Coolify](https://coolify.io/) for deployment management
- Host on local hardware (e.g., Qxote Mini PC)

---

### Why This Architecture?

- **Separation of Concerns**: Clear split between frontend and backend enables independent development and easier debugging
- **Consistent Dev Environments**: Docker ensures all developers work in identical environments, reducing “works on my machine” issues
- **Simplified Deployment**: Coolify’s web interface allows easy app management, updates, and monitoring
- **Scalability & Flexibility**: Modular stack makes it easier to add features and transition to public-facing apps if needed
- **Cost-Effective**: Hosting on local hardware reduces external dependencies and recurring infrastructure costs

---

## Suggested Implementation Roadmap

### Phase 1: Foundation Setup

- Set up Docker for frontend, backend, and database development
- Gather user feedback and identify desired features

### Phase 2: Core Application Development

- Design and implement the database schema
- Build data collection forms with validation logic
- Create backend API endpoints for CRUD operations
- Implement PWA functionality

### Phase 3: Production Readiness

- Add robust error handling
- Configure monitoring, logging, and regular backups
- Apply performance optimizations and security hardening

---

## Future Feature Ideas

_These features are not required for the initial release but are good candidates for post-launch iterations._

### Functionality Enhancements

- Display plot locations on an interactive map (e.g., Leaflet or Mapbox)
- Add a dashboard to visualize and interact with collected data (e.g., export to CSV or JSON)
- Allow photo capture via phone camera
- Get current weather and climate data based on user location

### UI/UX Improvements

- Replace default favicon with a high-resolution SVG
- Add real-time visual feedback for user actions and submission states

---

## Security Considerations

If the application is ever exposed beyond the local network, authentication and data protection become essential:

- **User Management**: Registration, login, and role-based access control
- **API Security**: Use authentication middleware (e.g., [Laravel Sanctum](https://laravel.com/docs/sanctum)), rate limiting, and token-based access
- **Data Protection**: Implement session management, security headers, and encrypted storage
- **SSL/TLS**: Coolify can manage SSL certificates and custom domain configuration

---

## Conclusion

The current version of the app validates the concept of digital flora and fauna tracking for Qxote. However, to reach production quality, a ground-up rewrite using the proposed architecture is strongly recommended. The Docker + Coolify approach provides a flexible, scalable foundation for ongoing development and can support both local and remote deployment needs as requirements evolve.

I've also added a zip to this repo which is for a school project I'm working on which can be used as insperation for the rewrite. I dont suggest using that project as is and instead setting it up fresh with all the required dependencies.
