export interface Journal {
    id: number;
    title: string;
    isSpecific: boolean;
    content: string;
    date: string;
}

export interface GroupedJournals {
    [key: string]: Journal[];
}