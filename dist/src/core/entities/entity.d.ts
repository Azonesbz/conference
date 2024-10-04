export declare abstract class Entity<P> {
    initialState: P;
    props: P;
    constructor(data: P);
    update(data: Partial<P>): void;
    commit(): void;
}
