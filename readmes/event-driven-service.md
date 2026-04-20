# Event-Driven Integration Service

## Technical Architecture

### Event Processing Flow

The service implements a robust event-driven architecture for processing external webhooks with guaranteed delivery and idempotency.

1. **Ingress Layer**: Provider-specific webhook endpoints receive HTTP POST requests
2. **Security Validation**: HMAC signature verification using provider-specific secrets
3. **Idempotency Check**: Atomic database constraint validation prevents duplicate processing
4. **Event Persistence**: Atomic INSERT operation stores event with PENDING status
5. **Queue Dispatch**: Event ID enqueued to BullMQ with exponential backoff configuration
6. **Asynchronous Processing**: Worker processes events with retry logic and status updates
7. **Completion**: Event status transitions to COMPLETED or DEAD_LETTER on failure

### Data Flow Diagram

```
External Provider â†’ HTTP Endpoint â†’ HMAC Validation â†’ Database Constraint Check
       â†“
Event Stored (PENDING) â†’ BullMQ Queue â†’ Worker Process â†’ Status Updates
       â†“
COMPLETED / DEAD_LETTER â†’ Observability Stack
```

### Technology Stack

- **Runtime**: Node.js 18+ with TypeScript 5.0+
- **Framework**: NestJS 10+ with dependency injection
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Queue System**: BullMQ 5+ with Redis 7+
- **Observability**: OpenTelemetry 1.20+ with Jaeger
- **Logging**: Winston 3.11+ with structured JSON output
- **Containerization**: Docker with multi-stage builds

## Reliability & Resilience

### Atomic Idempotency

The system guarantees exactly-once processing through database-level constraints:

- **Unique Constraint**: Composite unique index on (provider, eventId) prevents race conditions
- **Atomic Operations**: Single INSERT statement with constraint violation handling
- **Status Tracking**: Event lifecycle from PENDING â†’ PROCESSING â†’ COMPLETED/DEAD_LETTER
- **Duplicate Handling**: Existing events return 200 OK without reprocessing

### Retry Strategy

Configurable retry mechanism with exponential backoff:

- **Maximum Attempts**: 3 retry attempts per event
- **Backoff Algorithm**: Exponential delay (2^attempt * 1000ms)
- **Initial Delay**: 1 second base delay
- **Status Updates**: Retry count and next retry timestamp tracked per event
- **Failure Escalation**: Events exceeding retry limit moved to dead letter queue

### Dead Letter Queue

Failed events are isolated for analysis and manual intervention:

- **Automatic Escalation**: Events exceeding retry limit automatically moved
- **Status Isolation**: DEAD_LETTER status prevents further processing attempts
- **Audit Trail**: Complete processing history maintained for debugging
- **Manual Recovery**: Failed events can be requeued for retry

## Observability Stack

### Distributed Tracing

OpenTelemetry implementation provides end-to-end request visibility:

- **Span Creation**: Dedicated span for each event processing lifecycle
- **Span Attributes**: event.id, event.type, event.provider, retry_count
- **Error Recording**: Exceptions captured with full stack traces
- **Status Tracking**: Span status reflects processing success/failure
- **Trace Propagation**: Correlation across service boundaries

### Structured Logging

Winston-based logging with contextual information:

- **Event Correlation**: Automatic eventId injection in all log messages
- **Structured Format**: JSON output compatible with ELK/Datadog
- **Log Levels**: DEBUG, INFO, WARN, ERROR with appropriate categorization
- **Context Enrichment**: Request metadata, processing state, timing information
- **Log Rotation**: Configurable retention and rotation policies

### Health Monitoring

NestJS Terminus provides comprehensive health checks:

- **Database Connectivity**: PostgreSQL connection health monitoring
- **Memory Usage**: Heap and RSS memory tracking
- **Queue Health**: Redis connection and queue depth monitoring
- **Service Status**: HTTP endpoint for load balancer health checks

## API Standards

### Standardized Error Responses

All API endpoints return consistent error format:

```json
{
  "statusCode": 500,
  "timestamp": "2026-03-06T13:37:07.038Z",
  "path": "/api/webhooks/stripe",
  "message": "Error description",
  "correlationId": "uuid-v4",
  "traceId": "otel-trace-id"
}
```

**Required Fields**:
- `statusCode`: HTTP status code
- `timestamp`: ISO 8601 formatted timestamp
- `path`: Request path
- `message`: Human-readable error description
- `correlationId`: UUID for request tracking
- `traceId`: OpenTelemetry trace identifier

### Webhook Endpoints

Provider-specific endpoints with security validation:

```http
POST /webhooks/{provider}
Content-Type: application/json
X-{Provider}-Signature: signature-header-value
```

**Supported Providers**:
- `stripe`: Stripe payment webhooks
- `paypal`: PayPal transaction webhooks  
- `github`: GitHub repository webhooks

### Health Check Endpoint

```http
GET /health
```

Returns system health status with database and memory metrics.

## Infrastructure Operations

### Graceful Shutdown

Service handles termination signals for clean shutdown:

- **Signal Handling**: SIGTERM and SIGINT signal processing
- **Connection Cleanup**: Prisma and Redis connection termination
- **Job Completion**: Active jobs allowed to complete before shutdown
- **Resource Release**: Proper cleanup of system resources
- **Exit Codes**: Appropriate exit codes for orchestration systems

### Configuration Management

Environment-based configuration with validation:

```env
# Database Configuration
DATABASE_URL="postgresql://user:pass@host:port/database"

# Redis Configuration  
REDIS_HOST="localhost"
REDIS_PORT="6379"

# Provider Secrets
STRIPE_WEBHOOK_SECRET="whsec_..."
PAYPAL_WEBHOOK_SECRET="..."
GITHUB_WEBHOOK_SECRET="..."

# Observability
OTEL_SERVICE_NAME="event-driven-integration-service"
JAEGER_ENDPOINT="http://localhost:14268/api/traces"
```

## Development & Testing

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker 24+ (for infrastructure)

### Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Migration**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

3. **Start Infrastructure**
   ```bash
   docker-compose up -d
   ```

4. **Development Server**
   ```bash
   npm run start:dev
   ```

### Testing Strategy

- **Unit Tests**: Jest with isolated component testing
- **Integration Tests**: End-to-end webhook processing validation
- **Mock Infrastructure**: Redis and database mocking for CI/CD
- **Load Testing**: Performance validation under high throughput

### Docker Deployment

```bash
docker-compose up --build
```

Multi-stage Dockerfile optimizes production image size and security.

## Performance Characteristics

### Throughput Capacity

- **Event Processing**: 1000+ events/second per worker instance
- **Database Operations**: Connection pooling with configurable limits
- **Queue Throughput**: Redis-based queue with horizontal scaling
- **Memory Usage**: Optimized for long-running processes

### Scalability Considerations

- **Horizontal Scaling**: Multiple worker instances supported
- **Database Scaling**: Read replicas for high-volume scenarios
- **Queue Partitioning**: Multiple queue instances for load distribution
- **Monitoring Integration**: Prometheus metrics for scaling decisions

## Security Implementation

### HMAC Signature Validation

Provider-specific signature verification:

- **Algorithm**: HMAC-SHA256 with provider secrets
- **Header Parsing**: Provider-specific signature header extraction
- **Timing Attack Protection**: Constant-time comparison implementation
- **Secret Management**: Environment-based secret storage

### Input Validation

Comprehensive input sanitization and validation:

- **JSON Schema**: Provider-specific payload validation
- **Type Checking**: Runtime type validation for critical fields
- **Size Limits**: Payload size restrictions to prevent DoS
- **Content-Type**: Strict content type validation

## Production Deployment

### Infrastructure Requirements

- **Database**: PostgreSQL 15+ with connection pooling
- **Message Queue**: Redis 7+ with persistence configuration
- **Observability**: Jaeger collector for distributed tracing
- **Load Balancer**: HTTP/HTTPS termination with health checks

### Monitoring Stack

- **Metrics**: Prometheus with custom application metrics
- **Dashboards**: Grafana for operational visibility
- **Alerting**: AlertManager for incident response
- **Log Aggregation**: ELK stack or equivalent for log analysis

### Operational Procedures

- **Deployment**: Blue-green deployment with zero downtime
- **Rollback**: Automated rollback on health check failures
- **Scaling**: Horizontal pod autoscaling based on queue depth
- **Backup**: Database backup and recovery procedures

## Engineering Impact

### Reliability Engineering

- **SLA Guarantees**: 99.9% uptime with proper infrastructure
- **Error Budget**: Configurable error rate thresholds
- **Incident Response**: Structured logging and tracing for rapid debugging
- **Capacity Planning**: Metrics-driven scaling decisions

### Security Engineering

- **Data Protection**: Encrypted communication and storage
- **Access Control**: Provider-specific authentication
- **Audit Trail**: Complete processing history for compliance
- **Vulnerability Management**: Regular dependency updates and scanning

### Observability Engineering

- **SRE Practices**: Error budgets and SLI/SLO implementation
- **Debugging Efficiency**: Structured logs and distributed tracing
- **Performance Monitoring**: Real-time metrics and alerting
- **Capacity Planning**: Historical data for infrastructure sizing

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)

## Author

**Patrick Araujo - Computer Engineer**  
**GitHub**: https://github.com/PkLavc  
**Portfolio**: [https://pklavc.github.io/projects.html](https://pklavc.github.io/projects.html)

---

*Event-Driven Integration Service - Reliable webhook processing architecture with idempotency, retries and deep observability.*

