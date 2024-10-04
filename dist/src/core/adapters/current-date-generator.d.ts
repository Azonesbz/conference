import { IDateGenerator } from "../ports/date-generator.interface";
export declare class CurrentDateGenerator implements IDateGenerator {
    now(): Date;
}
