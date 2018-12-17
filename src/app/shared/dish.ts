import { Comment } from './comment';

// this file is kinda like .h files in C++, is the definition of a class
export class Dish {
    // Typescript makes it possible to use strong typing
    id: number;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
    comments: Comment[];
}

