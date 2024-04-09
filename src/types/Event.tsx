import { Date } from 'date-fns'; // O puedes usar Date de JavaScript
import { User } from './User';
import { Category } from './Category';

export interface Event {
    id: number;
    name: string;
    date: Date;
    total_available_attendees: number;
    description: string;
    price: number;
    categorie: Category;
    user: User;
    remaining_tickets: number;
}
