import mongoose from 'mongoose'

const schoolHistorySchema = new mongoose.Schema(
    {
            description : {
              type : String,
              required : true
            },
            coreValues : {
              type : [String],
              required : true
            }
    },
     { timestamps : true }
)

const missionVisionSchema = new mongoose.Schema(
    {
            mission : {
              type : String,
              required : true
            },
            vision : {
              type : String,
              required : true
            }
    },
     { timestamps : true }
)

const principleMessageSchema = new mongoose.Schema(
    {
            name : {
              type : String,
              required : true
            },
            photoUrl : {
              type : String,
              required : true
            },
            message : {
              type : String,
              required : true
            }
    },
     { timestamps : true }
)

const campusFacilitySchema = new mongoose.Schema(
    {
            name : {
              type : String,
              required : true
            },
            imageUrl : {
              type : String,
              required : true
            },
            description : {
              type : String,
              required : true
            }
    },
     { timestamps : true }
)


const aboutSchema = new mongoose.Schema(
  {
      schoolHistory : schoolHistorySchema,
      missionVision : missionVisionSchema,
       principleMessage :  principleMessageSchema,
      campusFacility : [ campusFacilitySchema ],
  },
  { timestamps : true }

)


const About = mongoose.model("About", aboutSchema)
export default About;
