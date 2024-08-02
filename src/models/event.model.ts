import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  name: string;
  date: Date;
  totalTickets: number;
  bookedTickets: number;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTickets: { type: Number, required: true },
  bookedTickets: { type: Number, default: 0 }
});

export default model<IEvent>('Event', eventSchema);
