export interface BibleBook {
    id: number;
    title: string;
    isOldTestament: boolean;
    notes: string;
    history: string;
    owner: number;
}

export interface BibleVerse {
    id: number;
    book: {title: string};
    chapter: number;
    verse: number;
    endVerse: number | null;
    content: string;
    owner: number;
}

// export interface DailyVerse {
//     id: number;
//     verse: BibleVerse;
//     date: string; // ISO 8601 date string
//     owner: number;
// }

export interface Prayer {
    id: number;
    title: string;
    content: string;
    date: string; // ISO 8601 date string
    owner: number;
}