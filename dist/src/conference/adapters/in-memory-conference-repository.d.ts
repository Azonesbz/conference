import { Conference } from "../entities/conference.entity";
import { IConferenceRepository } from "../ports/conference-repository.interface";
export declare class InMemoryConferenceRepository implements IConferenceRepository {
    database: Conference[];
    create(conference: Conference): Promise<void>;
    findById(id: string): Promise<Conference | null>;
    update(conference: Conference): Promise<void>;
}
