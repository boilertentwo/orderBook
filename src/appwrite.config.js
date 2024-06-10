import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66532c270006d5d87245');

export const account = new Account(client)

export const userDatabase = new Databases(client)

export default client