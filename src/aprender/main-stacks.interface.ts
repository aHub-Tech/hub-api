export interface IMainStacks {
    _id?: string;
    baseColor: string;
    source?: string;
    title: string[];
    info: {
        quote: string;
        author: string;
    }
    subjects?: string[] | number;
}
