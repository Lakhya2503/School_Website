import ApiResponse from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';
import CalendarEvent from './calendarEvent.model.js';
import ApiError from '../../utils/ApiError.js';
import { fieldNotFound } from '../../utils/helper.js';


const newEvent = asyncHandler(async(req,res)=>{

  const { eventTitle, startDate, endDate, category, location, Description } = req.body

  const startParsedDate = new Date(startDate);

  let endParsedDate;

  if(endDate) {
    endParsedDate = new Date(startDate);
  }

  const eventData =  {
      eventTitle,
      startDate : startParsedDate,
      endDate : endDate ? endParsedDate : endDate ,
      category,
      location,
      Description
  }

  const calendarEvent = await CalendarEvent.create(eventData)

  if(!calendarEvent) {
    throw new ApiError(500, "Can't create the calendar event")
  }

  return res.status(201).json(new ApiResponse(201))
})

const updateEvent = asyncHandler(async(req,res)=>{

  const { calendarEventId } = req.params
    const updateData = { ...req.body };

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new ApiError(400, "No data provided to update");
    }


  if (updateData.startDate) {
    const startParsedDate = new Date(updateData.startDate);
    if (isNaN(startParsedDate.getTime())) {
      throw new ApiError(400, "Invalid startDate format. Use YYYY-MM-DD");
    }
    updateData.startDate = startParsedDate;
  }

  if (updateData.endDate) {
    const endParsedDate = new Date(updateData.endDate);
    if (isNaN(endParsedDate.getTime())) {
      throw new ApiError(400, "Invalid endDate format. Use YYYY-MM-DD");
    }
    updateData.endDate = endParsedDate;
  }

    if (updateData.startDate && updateData.endDate) {
    if (updateData.endDate < updateData.startDate) {
      throw new ApiError(400, "End date cannot be before start date");
    }
  }


  const calendarEventUpdate =  await CalendarEvent.findByIdAndUpdate(
          calendarEventId,
  { $set: updateData },
  { new: true, runValidators: true }
    );

    if(!calendarEventUpdate) {
      throw new ApiError(404, "Calendar Event not found")
    }


  return res.status(200).json(new ApiResponse(200, "Event Update successfully"))
})

const getAllEvents = asyncHandler(async(req,res)=>{

  const allEvents = await CalendarEvent.find().lean()

  return res.status(200).json(new ApiResponse(200, allEvents, "fetch successfully all events"))
})

const deleteEvent = asyncHandler(async(req,res)=>{

  const { calendarEventId } = req.params

  const calendarEvent = await CalendarEvent.findById(calendarEventId)

  fieldNotFound(calendarEvent)

  await CalendarEvent.findByIdAndDelete(calendarEventId)


  return res.status(200).json(new ApiResponse(200, {}, "Delete event Successfully"))
})


export {
  newEvent,
  updateEvent,
  getAllEvents,
  deleteEvent
};
