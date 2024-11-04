export interface TodoItem {
    id: number;
    content: string;
    category: number;
    created_at: Date;
    due_date: Date;
    is_done: boolean;
}

export interface TodoData {
    content: string;
    category: number;
    due_date: string | null;
}

export interface TodoCategory {
    id: number;
    name: string;
}