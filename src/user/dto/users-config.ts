import { User } from "./user";
import { UserConfig } from './user-config';

export interface UsersConfig extends UserConfig {
    page: number;
    per_page: number;
    include_totals: boolean;
    sortBy: [keyof User, 'ASC' | 'DESC'];
    connection: string;
    q: string;
    search_engine: string;
}