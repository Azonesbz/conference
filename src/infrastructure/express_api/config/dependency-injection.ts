import { asClass, asValue, createContainer } from "awilix";
import { InMemoryConferenceRepository } from "../../../conference/adapters/in-memory-conference-repository";
import { IConferenceRepository } from "../../../conference/ports/conference-repository.interface";
import { ChangeSeats } from "../../../conference/usecases/change-seats";
import { OrganizeConference } from "../../../conference/usecases/organize-conference";
import { CurrentDateGenerator } from "../../../core/adapters/current-date-generator";
import { RandomIDGenerator } from "../../../core/adapters/random-id-generator";
import { IDateGenerator } from "../../../core/ports/date-generator.interface";
import { IIDGenerator } from "../../../core/ports/id-generator.interface";
import { MongoUser } from "../../../user/adapters/mongo/mongo-user";
import { MongoUserRepository } from "../../../user/adapters/mongo/mongo-user-repository";
import { IUserRepository } from "../../../user/ports/user-repository.interface";
import { BasicAuthenticator } from "../../../user/services/basic-authenticator";
import { InMemoryBookingRepository } from "../../../conference/adapters/in-memory-booking-repository";
import { InMemoryMailer } from "../../../core/adapters/in-memory-mailer";
import { IMailer } from "../../../core/ports/mailer.interface";
import { IBookingRepository } from "../../../conference/ports/booking-repository.interface";
import { ChangeDates } from "../../../conference/usecases/change-dates";


const container = createContainer()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    idGenerator: asClass(RandomIDGenerator).singleton(),
    dateGenerator: asClass(CurrentDateGenerator).singleton(),
    bookingRepository: asClass(InMemoryBookingRepository).singleton(),
    mailer: asClass(InMemoryMailer).singleton(),
    userRepository: asValue(new MongoUserRepository(MongoUser.UserModel))
})

const conferenceRepository = container.resolve('conferenceRepository') as IConferenceRepository
const idGenerator = container.resolve('idGenerator') as IIDGenerator
const dateGenerator = container.resolve('dateGenerator') as IDateGenerator
const mailer = container.resolve('mailer') as IMailer
const bookingRepository = container.resolve('bookingRepository') as IBookingRepository

const userRepository = container.resolve('userRepository') as IUserRepository

container.register({
    organizeConference: asValue(new OrganizeConference(
        conferenceRepository, idGenerator, dateGenerator
    )),
    changeSeats: asValue(new ChangeSeats(
        conferenceRepository, bookingRepository
    )),
    authenticator: asValue(new BasicAuthenticator(userRepository)),
    changeDates: asValue(new ChangeDates(
        conferenceRepository,
        dateGenerator,
        bookingRepository,
        mailer,
        userRepository
    ))
})

export default container
