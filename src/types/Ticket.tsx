import { Event } from './Event';
import { User } from './User';

export interface Ticket {
    event: Event;
    user: User;
    count: number;
}
