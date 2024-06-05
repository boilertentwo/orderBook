import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66532c270006d5d87245');

export const account = new Account(client)

export default client