import { Router } from 'express';
import { createBooking, cancelBooking, printTicket } from '../controllers/booking.controller';

const router = Router();

router.post('/bookings', createBooking);
router.delete('/bookings/:id', cancelBooking);
router.post('/print-ticket', printTicket);

export default router;
