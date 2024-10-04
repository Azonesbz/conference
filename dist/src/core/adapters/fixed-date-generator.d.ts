import { IDateGenerator } from "../ports/date-generator.interface";
export declare class FixedDateGenerator implements IDateGenerator {
    now(): Date;
}
