# Zenvia Integration Worker

A Node.js worker service that synchronizes call data from Zenvia communication platform to Google Sheets for reporting and analysis.

## Overview

This worker automatically fetches call records from Zenvia's API and synchronizes them to Google Sheets, providing a centralized view of communication data for business operations.

## Features

- **Call Data Synchronization**: Automatically syncs call records from Zenvia to Google Sheets
- **Date Filtering**: Filters records to include only yesterday's data
- **Queue Support**: Supports both queue-specific and general call reports
- **Real-time Updates**: Processes new data daily via automated workflows
- **Secure Data Handling**: All sensitive information is properly masked and secured

## Architecture

### Components

- **Zenvia API Client**: Fetches call data from Zenvia's communication platform
- **Google Sheets Integration**: Writes processed data to Google Sheets
- **Data Processing**: Filters and formats data for spreadsheet compatibility
- **Secure Logging**: Logs all operations with sensitive data masking

### Data Flow

1. **Authentication**: Receives Google OAuth token from Google Auth Worker
2. **Data Fetching**: Retrieves call records from Zenvia API
3. **Data Processing**: Filters for yesterday's records and formats data
4. **Sheet Update**: Appends processed data to Google Sheets
5. **Status Reporting**: Reports execution status to monitoring system

## Configuration

### Required Environment Variables

```bash
GOOGLE_TOKEN=oauth_access_token_from_google_auth_worker
ZENVIA_ACCESS_TOKEN=your_zenvia_api_access_token
ZENVIA_QUEUE_ID=optional_queue_id_for_specific_queue_reports
SPREADSHEET_ID=your_google_spreadsheet_id
SHEET_NAME=your_google_sheet_name
```

### GitHub Secrets

The following secrets must be configured in the GitHub repository:

- `GOOGLE_TOKEN`: OAuth access token (provided by Google Auth Worker)
- `ZENVIA_ACCESS_TOKEN`: Zenvia API access token
- `ZENVIA_QUEUE_ID`: Optional queue ID for specific queue reports
- `SPREADSHEET_ID`: Google Sheets spreadsheet ID
- `SHEET_NAME`: Target sheet name within the spreadsheet

## Usage

### Triggering Synchronization

The worker is triggered automatically by repository dispatch events from the Google Auth Worker:

```json
{
  "event_type": "google_token_ready",
  "client_payload": {
    "token": "oauth_access_token"
  }
}
```

### Data Processing

The worker processes call data with the following logic:

1. **Date Filtering**: Only includes records from yesterday
2. **Queue Filtering**: If `ZENVIA_QUEUE_ID` is provided, fetches queue-specific data
3. **Data Mapping**: Maps Zenvia fields to spreadsheet columns
4. **Batch Processing**: Sends data in batches of 5000 rows to avoid API limits

### Data Fields

The following fields are synchronized to Google Sheets:

- Call ID
- Date/Time (formatted for Brazil timezone)
- Source/Destination numbers
- Agent information
- Call status and duration
- Recording availability
- Disconnection reasons

## Security Features

- **Token Security**: OAuth tokens are received securely via repository dispatch
- **Data Masking**: All sensitive information is masked in logs
- **Environment Variables**: Credentials stored securely as environment variables
- **Minimal Permissions**: GitHub Actions workflows use minimal required permissions

## Monitoring

Execution status is reported to the central monitoring system:
- Success/failure status
- Number of records processed
- Execution timestamps
- Error details (with sensitive data masked)

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Verify Google token and Zenvia access token
2. **API Rate Limits**: The worker includes delays to avoid rate limiting
3. **Date Filtering**: Ensure system timezone is correctly configured
4. **Sheet Permissions**: Verify Google Sheets API permissions

### Logs

All execution logs are processed through secure logging functions that:
- Mask sensitive information
- Include timestamps and log levels
- Report to the monitoring system

## Integration Points

- **Google Auth Worker**: Receives OAuth tokens
- **Zenvia API**: Fetches call data
- **Google Sheets API**: Writes processed data
- **Cloud Operations Monitor**: Reports execution status

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

*Zenvia Integration Worker - Automated call-data ingestion pipeline for communications analytics.*

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor%20me-%23ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/PkLavc)
