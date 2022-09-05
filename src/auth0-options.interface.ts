export interface Auth0ModuleOptions {
    access_token_endpoint: string;
    identifier: string;
    client: {
        id: string;
        secret: string;
    }
}