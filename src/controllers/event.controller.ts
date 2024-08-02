import { Request, Response } from 'express';
import Event from '../models/event.model';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, totalTickets } = req.body;
    const event = await Event.create({ name, date, totalTickets });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error in Internal Server' });
  }
};
