import { Email, IMailer } from "../ports/mailer.interface";
export declare class InMemoryMailer implements IMailer {
    readonly sentEmails: Email[];
    send(email: Email): Promise<void>;
}
