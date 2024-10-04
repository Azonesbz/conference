import { ClassConstructor } from "class-transformer";
export declare const ValidatorRequest: <T>(type: ClassConstructor<T>, body: any) => Promise<{
    errors: boolean | string;
    input: T;
}>;
