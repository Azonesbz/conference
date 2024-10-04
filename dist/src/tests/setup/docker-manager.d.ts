import { StartedDockerComposeEnvironment } from "testcontainers";
export declare const startDocker: () => Promise<void>;
export declare const stopDocker: () => Promise<void>;
export declare const getDockerInstance: () => StartedDockerComposeEnvironment;
