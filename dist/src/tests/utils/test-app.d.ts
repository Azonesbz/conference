import express from 'express';
import { IFixture } from '../fixtures/fixture.interface';
export declare class TestApp {
    private app;
    private container;
    constructor();
    setup(): Promise<void>;
    loadAllFixtures(fixtures: IFixture[]): Promise<void[]>;
    tearDown(): Promise<void>;
    get expressApp(): express.Application;
}
