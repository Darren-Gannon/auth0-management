import { User } from "./user";

export interface UserConfig {
    fields: (keyof User)[];
    includeFields: boolean;
}