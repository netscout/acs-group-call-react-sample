# Azure Communication Service Group Call Sample - Server

This sample demonstrates how to use the Azure Communication Services calling SDK to create a group call server.

## Prerequisites

- Azure Communication Service connection string
  check [Create an Azure Communication Services Resource](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/Create-ACS-Resource) to get connection string.
- [Node.js](https://nodejs.org/en/download/) version 18 or higher

## Code Structure

- `server.ts` - The entry point of the sample.
- 'remove_users.ts' - The script to remove ACS users.

## Run the sample

1. Install dependencies by running `npm install` in the root directory.
2. Install `ts-node` by running `npm install -g ts-node` in the root directory.
3. Update the `connString` variable in `server.ts` with your ACS connection string.
4. Run `ts-node server.ts` to start the server.

## Remove ACS Users

When you join group calls, it will create ACS users. You can use the following steps to remove ACS users.

1. Update the `connString` variable in `remove_users.ts` with your ACS connection string.
2. Update the 'userIdsToRemove' variable in `remove_users.ts` with the user ids you want to remove.
3. Run `ts-node remove_users.ts` to remove ACS users.
