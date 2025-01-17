import { eventWithAttendees } from '../@types/apiReponse';
import prisma from '../prisma/prisma';

const findEvent = async (eventId: number): Promise<any> => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        isDeleted: false,
      },
      include: {
        Attendees: {
          select: {
            attendee: {
              select: {
                email: true,
              },
            },
          },
          // take: 1,
        },
      },
    });
    return event;
  } catch (err) {
    logger.error('Event: error while finding parent event', {
      err,
    });
    throw err;
  }
};

const findEventFromCalendar = async (
  calendarId: number,
  startTime: number,
  endTime: number
): Promise<eventWithAttendees[]> => {
  try {
    const whereCondition: {} = {
      calendarId,
      isDeleted: false,
      ...(startTime && { startTime: { gte: new Date(startTime) } }),
      ...(endTime && { endTime: { lte: new Date(endTime) } }),
    };

    // TODO: add pagination

    const event: eventWithAttendees[] = await prisma.event.findMany({
      where: whereCondition,
      include: {
        Attendees: {
          select: {
            attendee: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    return event;
  } catch (err) {
    logger.error('parentEvent: error while finding parent event', {
      err,
    });
    throw err;
  }
};

export { findEvent, findEventFromCalendar };
