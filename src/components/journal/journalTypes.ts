export interface Journal {
    id: number;
    content: string;
    date: string;
}

export interface GroupedJournals {
    [key: string]: Journal[];
}