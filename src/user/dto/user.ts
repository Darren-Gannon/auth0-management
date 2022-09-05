export interface User {
    user_id?: string;
    email?: string
    email_verified?: boolean;
    username?: string;
    phone_number?: string;
    phone_verified?: boolean;
    /**
     * Date and time when this user was created (ISO_8601 format).
     */
    created_at?: string;
    /**
     * Date and time when this user was last updated/modified (ISO_8601 format).
     */
    updated_at?: string; 
    identities?: any[];
    app_metadata?: any;
    user_metadata?: any;
    picture?: string;
    name?: string;
    nickname?: string;
    multifactor?: string[];
    last_ip?: string;
    /**
     * Last date and time this user logged in (ISO_8601 format).
     */
    last_login?: string;
    logins_count?: number;
    blocked?: boolean;
    given_name?: string;
    family_name?: string;
}