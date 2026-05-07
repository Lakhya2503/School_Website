import asyncHandler from '../../utils/asyncHandler';
import ApiResponse from '../../utils/ApiResponse';
import About from '../models/about.model';
import ApiError from '../../utils/ApiError';

const createAboutSection = asyncHandler(async(req,res)=>{

  const {
      schoolHistory,
      missionVision ,
      principleMessage ,
      campusFacility
     } = req.body

     const schoolData = {
        description : schoolHistory.description
     }

     let corevalueArray ;

    if(typeof schoolHistory.coreValues ===  "string") {
      corevalueArray =  schoolHistory.coreValues.split("," )
      schoolData.coreValues = corevalueArray
    }


     if(schoolHistory.coreValues && schoolHistory.coreValues.length > 0 ) {
        schoolData.coreValues = schoolData.coreValues
     } else {
        schoolData.coreValues = []
     }

     const missionVisionData = {
        mission : missionVision.mission,
        vision : missionVision.vision
     }

     const principleMessageData = {
        name : principleMessage.name,
        message : principleMessage.message
     }

     if(principleMessage.photoUrl) return principleMessageData.photoUrl =  principleMessage.photoUrl

     let campusAndFacility = [];

    if(campusFacility && campusFacility.lenth > 0){
          campusAndFacility.push(campusAndFacility)
    }
      else {
        campusAndFacility = []
    }


     const about = await About.create({
        schoolHistory : schoolData,
        missionVision : missionVisionData,
        principleMessage : principleMessageData,
        campusFacility : campusFacility
     })

     if(!about) {
       throw new ApiError(404, "About didn't create")
     }


  return res.status(201).json(new ApiResponse(201, about, "create About section successfully"))
})

const getAbout = asyncHandler(async(req,res)=>{

  const about = await About.find().lean()

  return res.status(200).json(new ApiResponse(200, about, "Fetch About"))
})

const updateSchoolHistory = asyncHandler(async(req,res)=>{

  const {
    description,
    coreValues
  } = req.body

  const updateData = { }

  if(typeof coreValues ===  "string" ) {
    corevalueArray =  coreValues.split("," )
    if(corevalueArray.length > 0) {
      updateData.coreValues = corevalueArray
    }
    updateData.coreValues = []
  }

  if(coreValues.length > 0 ) {
      updateData.coreValues = coreValues
  }


  if(description) updateData.description = description

  if(coreValues.lenth)updateData.vision = vision

  if(Object.values(updateData).length > 0) {
    throw new ApiError(400, "can not be empty please ensert the value")
  }


  const schoolHistory = await About.findOneAndUpdate(
    {},
    {
        schoolHistory : updateData
    },  { new: true, runValidators: true })


  if(!schoolHistory) {
    throw new ApiError(404, "schoolHistory didn't updated")
  }


    return res.status(200).json(new ApiError(200, schoolHistory, "Update School History successfully"))
})

const updateMissionVision = asyncHandler(async(req,res)=>{

  const {
    mission,
    vision
  } = req.body

  const updateData = { }

  if(mission)  updateData.mission = mission
  if(vision)  updateData.vision = vision

  if(Object.values(updateData).length > 0) {
    throw new ApiError(400, "can not be empty please ensert the value")
  }

  const missionVision = await About.findOneAndUpdate(
    {},
    {
        missionVision : updateData
    }
  )

  if(!missionVision) {
    throw new ApiError(404, "Mission Vision didn't updated")
  }


    return res.status(200).json(new ApiError(200, missionVision, "Update Mission vision successfully"))
})

const updatePrincipleMessage = asyncHandler(async(req,res)=>{


  const { name, photoUrl,message } = req.body

  const updateData = { }

  if(name)  updateData.name = name
  if(photoUrl)  updateData.photoUrl = photoUrl
  if(message)  updateData.message = message

  if(Object.values(updateData).length > 0) {
    throw new ApiError(400, "can not be empty please ensert the value")
  }

  const principlemessage = await About.findOneAndUpdate(
    {},
    {
        principleMessage : updateData
    }
  )

  if(!principlemessage) {
    throw new ApiError(404, "Principle Message didn't updated")
  }


  return res.status(200).json(new ApiResponse(200, updateprincipleMessage, "Update Principle Message succesfully" ))
})

const addCampusFacility = asyncHandler(async(req,res)=>{

  const { name,imageUrl, description } = req.body

  const campusFacility =  {
        name,
        description
  }

  if(Object.value(campusFacility).lenth == 0) {
    throw new ApiError("name and description are required")
  }

  if(imageUrl)  campusFacility.imageUrl = imageUrl

    const campusAndFacility = await About.findOneAndUpdate(
      {},
      {
          campusFacility : {
            $push : campusFacility
          }
      },
      { new : true }
    )

  if(campusAndFacility.campusFacility < 0) {
      throw new ApiError(404, "didn't add new campus facility")
  }

  return res.status(201).json(new ApiResponse(201, campusFacility, "add campus facility "))
})

const updateCampusFacility = asyncHandler(async(req,res)=>{

  const { name,imageUrl, description } = req.body
  const { facilityId } = req.params


  const updateData =  {
        name,
        description
  }

  if(Object.value(updateData).lenth == 0) {
    throw new ApiError("name and description are required")
  }

  if(imageUrl)  updateData.imageUrl = imageUrl

  const  updatecampusandfacility = await About.findOneAndUpdate(
    {
        "campusFacility._id" : facilityId
    }, {
        $set : {
          campusFacility : updateData
        }
    }
  )

  if(updatecampusandfacility.campusFacility < 0) {
      throw new ApiError(404, "didn't update campus facility")
  }

  return res.status(200).json(new ApiResponse(200, updatecampusandfacility, "Update Campus Facility"))
})

const deleteCampusFacility = asyncHandler(async(req,res)=> {

    const { facilityId } = req.params

  const facility = await About.findOne({
      "campusFacility._id" : facilityId
  })

  if(facility.lenth > 0) {
      throw new ApiError(404, "Campus Facility not found")
  }

  await About.findOneAndUpdate({},{
      $pull : {
          campusFacility : { id : facilityId}
      }
  }, { new : true})

  return res.status(200).json(new ApiResponse(200, {}, "Delete Campus Facility successfully"))
})


export {
  createAboutSection,
  updateSchoolHistory,
  updateMissionVision,
  updatePrincipleMessage,
  addCampusFacility,
  updateCampusFacility,
  deleteCampusFacility,
  getAbout
}
