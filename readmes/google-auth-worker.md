# Google Auth Worker

A Node.js worker service responsible for generating and distributing Google OAuth tokens to other integration services.

## Overview

This worker automates the process of generating Google OAuth access tokens using service account credentials and distributing them to various integration workers that require Google API access.

## Features

- **OAuth Token Generation**: Automatically generates Google OAuth access tokens
- **Service Account Authentication**: Uses Google Service Account credentials for authentication
- **Token Distribution**: Distributes tokens to multiple integration workers via GitHub repository dispatch
- **Scheduled Execution**: Runs automatically via GitHub Actions on a schedule
- **Manual Execution**: Supports manual triggering with specific repository targeting

## Architecture

### Components

- **Token Generator**: Generates OAuth access tokens using JWT authentication
- **Token Dispatcher**: Sends tokens to integration workers via GitHub API
- **Monitoring Integration**: Reports execution status to the central monitoring system

### Integration Points

- **Google APIs**: Authenticates with Google OAuth2 service
- **GitHub API**: Dispatches tokens to other repositories
- **Cloud Operations Monitor**: Reports execution status

## Configuration

### Required Environment Variables

```bash
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GH_PAT=your_github_personal_access_token
```

### GitHub Secrets

The following secrets must be configured in the GitHub repository:

- `GOOGLE_CLIENT_EMAIL`: Google Service Account email address
- `GOOGLE_PRIVATE_KEY`: Google Service Account private key (with proper escaping)
- `GH_PAT`: GitHub Personal Access Token with repository dispatch permissions

## Usage

### Automatic Execution

The worker runs automatically every day at 06:00 AM BrasÃ­lia time via GitHub Actions:

```yaml
schedule:
  - cron: '0 9 * * *' # 06:00 AM BrasÃ­lia
```

### Manual Execution

Trigger the workflow manually with optional repository targeting:

```yaml
workflow_dispatch:
  inputs:
    repo_especifico:
      description: 'Specific repository (e.g., organization/worker-zoho-sync). Leave EMPTY to run ALL.'
      required: false
      default: ''
```

### Target Repositories

By default, the worker dispatches tokens to:
- `organization/worker-hablla-integration`
- `organization/worker-zoho-integration`
- `organization/worker-zenvia-integration`

## Security Features

- **Secure Token Generation**: Uses JWT authentication with service account credentials
- **Token Masking**: All sensitive data is masked in logs
- **Environment Variables**: Credentials stored securely as environment variables
- **Minimal Permissions**: GitHub Actions workflows use minimal required permissions

## Monitoring

Execution status is reported to the central monitoring system:
- Success/failure status
- Execution timestamps
- Error details (with sensitive data masked)

## Troubleshooting

### Common Issues

1. **Invalid Credentials**: Verify service account email and private key
2. **Insufficient Permissions**: Ensure GitHub PAT has repository dispatch permissions
3. **Network Issues**: Check connectivity to Google OAuth2 endpoints

### Logs

All execution logs are processed through secure logging functions that:
- Mask sensitive information
- Include timestamps and log levels
- Report to the monitoring system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the development team.

## Author

**Patrick Araujo - Computer Engineer**  
**GitHub**: https://github.com/PkLavc  
**Portfolio**: [https://pklavc.github.io/projects.html](https://pklavc.github.io/projects.html)

---

*Google Auth Worker - Secure token orchestration for distributed integration pipelines.*

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
