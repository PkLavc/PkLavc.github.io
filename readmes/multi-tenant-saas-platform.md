# Multi-Tenant SaaS Backend Platform

[![NestJS](https://img.shields.io/badge/NestJS-10+-red.svg)](https://nestjs.com)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-blue.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/PkLavc/saas-backend-platform/actions)

## Project Overview

A robust production-ready backend API built with NestJS, designed for enterprise-grade Software-as-a-Service applications.
## Getting Started

Quick guide to set up and run the platform.

## Architecture Overview

### Visual Request Lifecycle
```mermaid
graph TD
    A[Client Request] --> B[Global Guards: JWT & RBAC]
    B --> C[Global Interceptors: Logging/Transform]
    C --> D[Feature Module: Controller]
    D --> E[Service Layer: Business Logic]
    E --> F[Repository Layer: Prisma ORM]
    F --> G[(PostgreSQL: Row Level Isolation)]
    
    subgraph Async Operations
        E --> H[BullMQ / Redis]
        H --> I[Worker: Email/Billing]
    end
```

### Engineering Impact & National Interest
| Component | Implementation | Industry Value |
| :--- | :--- | :--- |
| **Data Isolation** | Row-Level Multi-tenancy | Essential for GDPR/CCPA compliance in SaaS |
| **Security Architecture** | JWT + RBAC + Passport.js | Protects enterprise data against unauthorized access |
| **Scalability** | Redis Queue + BullMQ Workers | Handles high-volume traffic without system degradation |
| **Maintainability** | Clean Architecture & NestJS DI | Reduces long-term technical debt and operational costs |

### Core Architecture Patterns

- **Clean Architecture**: Clear separation between presentation, business, and data layers
- **Dependency Injection**: NestJS DI system for testable, maintainable code
- **Module Organization**: Feature-based modules for scalability
- **Repository Pattern**: Abstracted data access through Prisma
- **DTO Validation**: Comprehensive input validation and transformation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Tech Stack

- **Language**: TypeScript 5.0+
- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+ (Enterprise-grade backend framework)
- **Database**: PostgreSQL 15+ (ACID compliance, row-level security)
- **ORM**: Prisma 5+ (Type-safe database access)
- **Authentication**: JWT with Passport.js (Stateless authentication)
- **Authorization**: Role-based access control (RBAC)
- **Queue System**: Redis + BullMQ (Background job processing)
- **Validation**: class-validator + class-transformer
- **Containerization**: Docker 24+ with multi-stage builds
- **Testing**: Jest 29+ with Supertest for E2E testing
- **Logging**: Winston structured logging

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt

### Multi-Tenancy
- Organization-based data isolation
- Row-level multi-tenancy
- Users belong to organizations

### CRUD Modules
- **Users**: Manage organization users
- **Organizations**: Admin-only management
- **Projects**: Organization-specific projects
- **Tasks**: Project-specific tasks with assignment

All modules include:
- Pagination
- Filtering
- Sorting
- Input validation
- Error handling

### Background Processing
- Asynchronous email sending simulation (logged to console)
- Job retries and failure handling (simplified)
- Logging

### External Integration
- Mocked Stripe payment processing
- Webhook endpoint for payment events

### Testing
- Unit tests for services
- Basic e2e test for authentication

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_saas?schema=public"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"

# Redis
REDIS_URL="redis://localhost:6379"

# Email (simulation)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-password"

# Payment (Stripe sandbox)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis
- Docker (optional)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-saas-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   ```bash
   # Start PostgreSQL and Redis locally or via Docker
   docker run --name postgres -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=portfolio_saas -p 5432:5432 -d postgres:15
   docker run --name redis -p 6379:6379 -d redis:7-alpine
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

6. **Start the application**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

This will start the app, PostgreSQL, and Redis.

## API Documentation

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationId": "org-id"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "jwt-token-here"
}
```

### Organizations (Admin only)

#### Create Organization
```http
POST /organizations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Company"
}
```

#### List Organizations
```http
GET /organizations?page=1&limit=10&name=search
Authorization: Bearer <token>
```

### Projects

#### Create Project
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Redesign company website"
}
```

#### List Projects
```http
GET /projects?page=1&limit=10&name=search
Authorization: Bearer <token>
```

### Tasks

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Design homepage",
  "description": "Create new homepage design",
  "projectId": "project-id"
}
```

#### List Tasks
```http
GET /tasks?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

### Payments

#### Create Payment Intent
```http
POST /payments/create-intent
Content-Type: application/json

{
  "amount": 1000,
  "currency": "usd"
}
```

#### Webhook
```http
POST /payments/webhook
Content-Type: application/json
Stripe-Signature: <signature>

{
  "type": "payment_intent.succeeded",
  "data": { ... }
}
```

## Design Decisions

### Multi-Tenancy
- **Row-based multi-tenancy**: Each table includes `organizationId` for data isolation
- **Pros**: Simple, scalable, no schema duplication
- **Cons**: Requires careful query filtering

### Authentication
- **JWT with Passport**: Industry standard, stateless
- **Role-based**: Simple ADMIN/USER roles
- **Password hashing**: bcrypt for security

### Background Jobs
- **BullMQ with Redis**: Reliable queue system
- **Email simulation**: Logs instead of actual sending for demo

### Payment Integration
- **Mocked Stripe**: Simulates real payment processing
- **Webhook handling**: Basic event processing

### Database
- **PostgreSQL**: Robust, ACID compliant
- **Prisma**: Type-safe ORM, migrations, schema management

### Architecture
- **NestJS modules**: Feature-based organization
- **Dependency injection**: Testable, maintainable code
- **Validation**: class-validator for input validation

### Technical Note on Data Isolation
The platform implements a Shared Database, Shared Schema strategy. Data isolation is enforced at the service level through mandatory organizationId filters in every query. This approach balances cost-efficiency with the scalability required for high-growth startups.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Deployment

This application is containerized with Docker and can be deployed to any cloud platform supporting Docker containers (AWS ECS, Google Cloud Run, Azure Container Instances, etc.).

For production:
1. Use environment-specific configs
2. Set up proper database migrations
3. Configure monitoring and logging
4. Implement rate limiting
5. Add API versioning
6. Set up CI/CD pipeline

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Use meaningful commit messages

## Author

**Patrick Araujo - Computer Engineer** To view other projects and portfolio details, visit:
[https://pklavc.github.io/projects.html](https://pklavc.github.io/projects.html)

---

*This project demonstrates advanced backend development capabilities for enterprise SaaS applications.*

<<<<<<< HEAD
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
>>>>>>> 14bbba43 (Clean up project structure and update documentation)
>>>>>>> 87cf431c
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
=======
<<<<<<< HEAD
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
=======
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
>>>>>>> 14bbba43 (Clean up project structure and update documentation)
>>>>>>> 87cf431c

