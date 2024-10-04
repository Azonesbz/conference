import { DomainException } from "../../core/exceptions/domain-exception";
import { Executable } from "../../core/executable.interface";
import { ConferenceNotFoundException } from "../../exceptions/conference-not-found";
import { ConferenceUpdateForbidden } from "../../exceptions/conference-update-forbidden";
import { User } from "../../user/entities/user.entity";
import { Booking } from "../entities/booking.entity";
import { Conference } from "../entities/conference.entity";
import { IBookingRepository } from "../ports/booking-repository.interface";
import { IConferenceRepository } from "../ports/conference-repository.interface";

type RequestChangeSeats = {
  user: User;
  conferenceId: string;
  seats: number;
};

type ResponseChangeSeats = void;

export class ChangeSeats
  implements Executable<RequestChangeSeats, ResponseChangeSeats>
{
  constructor(private readonly repository: IConferenceRepository, private readonly bookingRepository: IBookingRepository) {}

  async execute({ user, conferenceId, seats }) {
    const conference = await this.repository.findById(conferenceId);
    const booking = await this.bookingRepository.findByConferenceId(conferenceId);

    if (!conference) throw new ConferenceNotFoundException();

    if (conference.props.organizerId !== user.props.id)
      throw new ConferenceUpdateForbidden();

    if (seats < booking.length) {
        throw new DomainException("You cannot reduce the number of seats lower than booking")
    }

    conference.update({ seats });

    if (conference.hasNotEnoughSeats() || conference.hasTooManySeats()) {
      throw new Error(
        "The conference must have a maximum of 1000 seats and minimum of 20 seats"
      );
    }

    await this.repository.update(conference);
  }

  async addBooking({ booking }: { booking: Booking }) {
    const conferenceId: string = booking.props.conferenceId
    const conference: Conference = await this.repository.findById(conferenceId) as Conference;
    const bookingNumber: Booking[] = await this.bookingRepository.findByConferenceId(conferenceId);

    if(conference && (bookingNumber.length >= conference.props.seats)){
        throw new DomainException("You can't book this conference because all the places are took")
    }

    await this.bookingRepository.create(booking)
  }
}
