import mongoose from "mongoose"
import {
  eventCategory,
   eventCategoryEnums
} from "../../utils/constant.js"

const calendarEventSchema = new mongoose.Schema(

  {
      eventTitle : {
        type : String,
        unquie : true,
        required : true
      },
      startDate : {
        type : Date,
        required : true
      },
      endDate : {
        type : Date
      },
      category : {
        type : String,
        required : true,
        default : eventCategory.EVENT,
        enum : eventCategoryEnums
      },
      location : {
        type : String,
        default : ""
      },
      Description : {
        type : String,
        default : ""
      }
  }, {
    timestamps : true
  }
)


const CalendarEvent = mongoose.model("CalendarEvent", calendarEventSchema)
export default CalendarEvent
