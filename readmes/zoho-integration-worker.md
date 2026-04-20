# Zoho Integration Worker

A Node.js worker service that synchronizes data from Zoho Creator applications to Google Sheets for business reporting and analysis.

## Overview

This worker provides automated data synchronization between Zoho Creator applications and Google Sheets, enabling seamless data flow for business operations and reporting needs.

## System Architecture

```mermaid
graph TB
    A[Worker Google Auth] -->|Dispatch Event| B[Worker Zoho Integration]
    B --> C[Zoho Creator API]
    B --> D[Google Sheets API]
    C --> E[Application Data]
    C --> F[Report Data]
    D --> G[Target Spreadsheet]
    B --> H[Data Processing Engine]
    H --> I[Field Mapping]
    H --> J[Date Filtering]
    H --> K[Batch Processing]
    
    L[GitHub Secrets] --> B
    M[Environment Variables] --> B
    N[Column Mapping JSON] --> I
```

## Features

- **Zoho Creator Integration**: Fetches data from Zoho Creator applications and reports
- **Google Sheets Synchronization**: Writes processed data to Google Sheets
- **Flexible Data Mapping**: Supports custom field mapping via JSON configuration
- **Date-based Filtering**: Filters records based on specific date criteria
- **Report Generation**: Supports both standard and custom report synchronization
- **Secure Data Handling**: All sensitive information is properly masked and secured

## Technical Architecture

### Components

- **Zoho API Client**: Authenticates and fetches data from Zoho Creator
- **Google Sheets Integration**: Writes processed data to Google Sheets
- **Data Processing Engine**: Maps and transforms Zoho data for spreadsheet compatibility
- **Report Synchronization**: Handles both standard and custom report data
- **Secure Logging**: Logs all operations with sensitive data masking

### Data Flow

1. **Authentication**: Uses OAuth2 tokens from Google Auth Worker
2. **Data Fetching**: Retrieves records from Zoho Creator via API
3. **Data Processing**: Maps Zoho fields to spreadsheet columns using JSON configuration
4. **Date Filtering**: Filters records based on business requirements (e.g., yesterday's data)
5. **Sheet Update**: Appends or overwrites data in Google Sheets
6. **Status Reporting**: Reports execution status to monitoring system

## Security Implementation

### Multi-Layer Security Architecture

```mermaid
graph LR
    A[GitHub Secrets] --> B[Environment Variables]
    B --> C[OAuth Authentication]
    C --> D[API Communication]
    D --> E[Data Processing]
    E --> F[Google Sheets]
    
    G[Masking Functions] --> H[Log Protection]
    I[Sanitization] --> J[Input Validation]
    K[Formula Injection Prevention] --> L[Spreadsheet Security]
    M[Minimal Permissions] --> N[Attack Surface Reduction]
```

### Security Features

- **OAuth Security**: Uses OAuth2 authentication for both Google and Zoho APIs
- **Token Security**: OAuth tokens are received securely via repository dispatch
- **Data Masking**: All sensitive information is masked in logs
- **Environment Variables**: Credentials stored securely as environment variables
- **Minimal Permissions**: GitHub Actions workflows use minimal required permissions
- **Explicit Secret Masking**: All secrets are explicitly masked in GitHub Actions workflows using `::add-mask::`
- **Secure Logging**: Custom `secureLog` function ensures no sensitive data is exposed in logs
- **Spreadsheet Formula Injection Prevention**: Custom `sanitize` function prevents malicious formulas from being injected into Google Sheets

## Data Flow Security

```mermaid
sequenceDiagram
    participant Auth as Worker Google Auth
    participant GH as GitHub Actions
    participant Zoho as Zoho Creator API
    participant Sheets as Google Sheets
    participant Worker as Worker Zoho Integration
    
    Auth->>GH: Dispatch Event (masked token)
    GH->>Worker: Trigger Workflow
    Worker->>Zoho: Secure Authentication
    Zoho->>Worker: Application Data
    Worker->>Sheets: Processed Data (sanitized)
    Worker->>Sheets: Report Data (sanitized)
    Note over Worker,Sheets: All data is sanitized before writing
```

## Configuration

### Required Environment Variables

```bash
GOOGLE_TOKEN=oauth_access_token_from_google_auth_worker
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
ZOHO_ACCOUNT_OWNER=your_zoho_account_owner
ZOHO_APP_LINK_NAME=your_zoho_app_link_name
ZOHO_REPORT_LINK_NAME=your_zoho_report_link_name
SPREADSHEET_ID=your_google_spreadsheet_id
SHEET_NAME=your_google_sheet_name
COLUMN_MAPPING=your_field_mapping_json
```

### GitHub Secrets

The following secrets must be configured in the GitHub repository:

- `GOOGLE_TOKEN`: OAuth access token (provided by Google Auth Worker)
- `ZOHO_CLIENT_ID`: Zoho OAuth client ID
- `ZOHO_CLIENT_SECRET`: Zoho OAuth client secret
- `ZOHO_REFRESH_TOKEN`: Zoho OAuth refresh token
- `ZOHO_ACCOUNT_OWNER`: Zoho account owner identifier
- `ZOHO_APP_LINK_NAME`: Zoho application link name
- `ZOHO_REPORT_LINK_NAME`: Zoho report link name
- `SPREADSHEET_ID`: Google Sheets spreadsheet ID
- `SHEET_NAME`: Target sheet name within the spreadsheet
- `COLUMN_MAPPING`: JSON configuration for field mapping

## Usage

### Standard Data Synchronization

The main worker synchronizes data from Zoho Creator to Google Sheets:

```json
{
  "event_type": "google_token_ready",
  "client_payload": {
    "token": "oauth_access_token"
  }
}
```

### Report Synchronization

The report worker handles custom report data synchronization:

```json
{
  "event_type": "report_token_ready",
  "client_payload": {
    "token": "oauth_access_token"
  }
}
```

### Field Mapping Configuration

The `COLUMN_MAPPING` environment variable should contain a JSON object mapping Zoho fields to spreadsheet columns:

```json
{
  "column_a": "zoho_field_1",
  "column_b": "zoho_field_2",
  "column_c": "zoho_field_3"
}
```

### Data Processing

The worker processes Zoho data with the following logic:

1. **Authentication**: Authenticates with Zoho using OAuth2
2. **Data Fetching**: Retrieves records from specified Zoho application and report
3. **Date Filtering**: Filters records based on business requirements
4. **Field Mapping**: Maps Zoho fields to spreadsheet columns
5. **Data Transformation**: Handles complex field types (lookups, multi-select, etc.)
6. **Batch Processing**: Sends data in batches to avoid API limits

## Advanced Features

### Complex Field Handling

The worker supports various Zoho field types:
- **Lookup Fields**: Automatically extracts display values
- **Multi-select Fields**: Joins multiple values with commas
- **Date/Time Fields**: Properly formatted for spreadsheet compatibility
- **Formula Fields**: Handled as regular data fields

### Report Synchronization

The report worker provides additional functionality:
- **Paginated Data**: Handles large datasets with pagination
- **Custom Reports**: Supports custom Zoho reports
- **Data Overwrite**: Uses PUT method to overwrite existing data
- **Flexible Configuration**: Separate configuration for report-specific settings

### Optimization Features

- **Batch Processing**: Uses `append` for data insertion to minimize Google Sheets API quota consumption
- **Pagination Control**: Implements smart pagination that breaks the loop if no new records are found
- **Rate Limiting**: Includes delays to respect API rate limits
- **Efficient Date Filtering**: Filters data at the API level to reduce data transfer

## Monitoring & Observability

* **Execution Logs**: Secure logging with masked sensitive data
* **Status Tracking**: Integration with cloud-operations-monitor for uptime tracking
* **Error Reporting**: Structured error handling with secure error messages
* **Performance Metrics**: Built-in timing and pagination tracking

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Verify OAuth credentials for both Google and Zoho
2. **API Rate Limits**: The worker includes delays to avoid rate limiting
3. **Field Mapping**: Ensure COLUMN_MAPPING JSON is properly formatted
4. **Date Filtering**: Verify date criteria match business requirements
5. **Sheet Permissions**: Verify Google Sheets API permissions

### Logs

All execution logs are processed through secure logging functions that:
- Mask sensitive information
- Include timestamps and log levels
- Report to the monitoring system

## Integration Points

- **Google Auth Worker**: Receives OAuth tokens
- **Zoho Creator API**: Fetches application and report data
- **Google Sheets API**: Writes processed data
- **Cloud Operations Monitor**: Reports execution status

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security Compliance

This implementation follows security best practices:

- âœ… **Zero Trust Architecture**: No hardcoded secrets or credentials
- âœ… **Defense in Depth**: Multiple layers of security controls
- âœ… **Principle of Least Privilege**: Minimal permissions and short-lived tokens
- âœ… **Secure by Design**: Security built into the architecture from the ground up
- âœ… **Public Repository Safe**: No sensitive data exposed even in public repositories
- âœ… **Input Validation**: All external data is validated and sanitized
- âœ… **Output Encoding**: Prevents injection attacks in Google Sheets
- âœ… **API Security**: Secure communication with both Zoho and Google APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Submit a pull request

## Support

For support and questions, please contact the development team.

## Author

**Patrick Araujo - Computer Engineer**  
**GitHub**: https://github.com/PkLavc

**Portfolio**: [https://pklavc.github.io/projects.html](https://pklavc.github.io/projects.html)

---

*Zoho Integration Worker - Secure ETL synchronization pipeline from Zoho Creator to Google Sheets.*

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
