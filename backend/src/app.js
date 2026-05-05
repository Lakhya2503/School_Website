import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import globalErrorHandler from './middleware/error.middleware.js'
import ApiResponse from './utils/ApiResponse.js'

const app = express()


app.use(cors({
    origin : process.env.CORS,
    credentials : true,
    methods : [ "GET", "POST", "PUT", "DELETE" ]
}))



app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({ extended : true, limit : "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// import routers
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import AuthRouter from './routes/auth.route.js'
import AboutRouter from './routes/about.route.js'
import AcademicsRouter from './routes/academic.route.js'
import AnnoucementRouter from './routes/announcements.route.js'
import CalendarEventRouter from './routes/calendarEvent.route.js'
import FeeStructureRouter from './routes/feeStructure.route.js'
import InquirieRouter from './routes/inquiries.route.js'
import NoticeRouter from './routes/notice.route.js'
import GalleryRouter from './routes/gallery.route.js'


// routers
app.use("/api", globalLimiter)
app.use("/api/vidyalaya/v1/auth", authLimiter, AuthRouter)
app.use("/api/vidyalaya/v1/about", AboutRouter)
app.use("/api/vidyalaya/v1/announcement", AnnoucementRouter)
app.use("/api/vidyalaya/v1/academics", AcademicsRouter)
app.use("/api/vidyalaya/v1/calendar-event", CalendarEventRouter)
app.use("/api/vidyalaya/v1/fee-structure", FeeStructureRouter)
app.use("/api/vidyalaya/v1/inquirie", InquirieRouter)
app.use("/api/vidyalaya/v1/notice", NoticeRouter)
app.use("/api/vidyalaya/v1/gallery", GalleryRouter)


app.get('/api/vidyalaya/v1/check-router', (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {
            status: "ok",
            method: req.method,
            url: req.originalUrl,
            timestamp: new Date()
        }, "Health check passed")
    );
});

// last router where error handling
app.use(globalErrorHandler);


export default app;
