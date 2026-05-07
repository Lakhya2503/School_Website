import { Router } from 'express'
import { deleteEvent, getAllEvents, newEvent, updateEvent } from './calendarEvent.controller.js';

const router = Router()

// ? ------------- Create Event  -------------
router.route("/new-event").post(newEvent)

// ** ------------- Update Event  -------------
router.route("/update-event/:calendarEventId").put(updateEvent)


// ** ------------- Get all Event  -------------
router.route("/get-all-event").get(getAllEvents)


// ! ------------- Delete Event  -------------
router.route("/delete-event/:calendarEventId").delete(deleteEvent)


export default router;
