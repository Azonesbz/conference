export class ConferenceUpdateForbidden extends Error {
    constructor(){
        super("You are not allowed to update this conference")
    }
}