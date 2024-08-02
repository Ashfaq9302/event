import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import Event from '../models/event.model';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, quantity } = req.body;
    if (quantity > 15) return res.status(400).json({ error: 'Cant book more than 15 tickets per request' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.bookedTickets + quantity > event.totalTickets)
      return res.status(400).json({ error: 'Enough tickets are not available' });

    event.bookedTickets += quantity;
    await event.save();

    const booking = await Booking.create({ userId, eventId, quantity });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking canceled' });
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.body.bookingId).populate('eventId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    res.status(200).json({ booking, event: booking.eventId });
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};
