import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import About from './about.model.js';
import ApiError from '../../utils/ApiError.js';

const createAboutSection = asyncHandler(async(req,res)=>{

  const {
      schoolHistory,
      missionVision ,
      principleMessage ,
      campusFacility,
      faculityMember
     } = req.body

     console.log(
          "req.body" ,req.body
     );


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

    if(campusFacility || campusFacility.length > 0){
      campusAndFacility.push(campusFacility)
    }
    else {
        campusAndFacility = []
    }

      let faculityMemberArray = [];

    if(faculityMember || faculityMember.length > 0){

      faculityMemberArray.push(faculityMember)
    }
    else {
      faculityMemberArray = []
    }
    console.log("faculityMemberArray",faculityMemberArray);
    console.log("campusAndFacility",campusAndFacility);


     const about = await About.create({
        schoolHistory : schoolData,
        missionVision : missionVisionData,
        principleMessage : principleMessageData,
        campusFacility : campusAndFacility,
        faculityMember : faculityMemberArray
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

  let corevalueArray = [];

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

  if(coreValues.length)updateData.coreValues = coreValues

  if(Object.values(updateData).length === 0) {
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


    return res.status(200).json(new ApiResponse(200, schoolHistory.schoolHistory,"Update School History successfully"))
})

const updateMissionVision = asyncHandler(async(req,res)=>{

  const {
    mission,
    vision
  } = req.body

  const updateData = { }

  if(mission)  updateData.mission = mission
  if(vision)  updateData.vision = vision

  if(Object.values(updateData).length === 0) {
    throw new ApiError(400, "can not be empty please ensert the value")
  }

  const missionVision = await About.findOneAndUpdate(
    {},
    {
        missionVision : updateData
    },{ new: true, runValidators: true }
  )

  if(!missionVision) {
    throw new ApiError(404, "Mission Vision didn't updated")
  }


    return res.status(200).json(new ApiResponse(200, missionVision.missionVision, "Update Mission vision successfully"))
})

const updatePrincipleMessage = asyncHandler(async(req,res)=>{


  const { name, photoUrl,message } = req.body

  const updateData = { }

  if(name)  updateData.name = name
  if(photoUrl)  updateData.photoUrl = photoUrl
  if(message)  updateData.message = message

  if(Object.values(updateData).length === 0) {
    throw new ApiError(400, "can not be empty please ensert the value")
  }

  const principlemessage = await About.findOneAndUpdate(
    {},
    {
        principleMessage : updateData
    },{ new: true, runValidators: true }
  )

  if(!principlemessage) {
    throw new ApiError(404, "Principle Message didn't updated")
  }


  return res.status(200).json(new ApiResponse(200, principlemessage.principleMessage, "Update Principle Message succesfully" ))
})

const addCampusFacility = asyncHandler(async(req,res)=>{

  const { name,imageUrl, description } = req.body

  const campusFacility =  {
        name,
        description
  }

  if(Object.values(campusFacility).length === 0) {
    throw new ApiError("name and description are required")
  }

  if(imageUrl)  campusFacility.imageUrl = imageUrl

    const campusAndFacility = await About.findOneAndUpdate(
      {},
      {
         $push : {
          campusFacility : campusFacility
         }
      },
      { new : true }
    )

  if(campusAndFacility.campusFacility === 0) {
      throw new ApiError(404, "didn't add new campus facility")
  }

  return res.status(201).json(new ApiResponse(201, campusAndFacility.campusFacility, "add campus facility "))
})


const addFaculityMember = asyncHandler(async(req,res)=>{

  const { fullName, role, subject, experience, photoUrl } = req.body

  const faculityMember =  {
        fullName, role, subject, experience
  }

  if(Object.values(faculityMember).length === 0) {
    throw new ApiError("name and description are required")
  }

  if(photoUrl)  faculityMember.photoUrl = photoUrl

    const newFaculityMember = await About.findOneAndUpdate(
      {},
      {
         $push : {
          faculityMember : faculityMember
         }
      },
      { new : true }
    )

  if(newFaculityMember.faculityMember === 0) {
      throw new ApiError(404, "didn't add new campus facility")
  }

  return res.status(201).json(new ApiResponse(201, newFaculityMember.faculityMember, "add Faculity Member "))
})

const updateCampusFacility = asyncHandler(async (req, res) => {
    const { facilityId } = req.params;
    const { name, imageUrl, description } = req.body;


    const updateData = {};
    const fields = { name, description, imageUrl };

    if(name) updateData.name = name
    if(description) updateData.description = description
    if(imageUrl) updateData.imageUrl = imageUrl

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "At least one field is required to update");
    }

    // 3. Find and update the specific array element
    const updatedAbout = await About.findOneAndUpdate(
        { "campusFacility._id": facilityId },
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedAbout) {
        throw new ApiError(404, "Campus facility not found");
    }

    // 4. Extract only the updated facility to send back to the frontend
    const updatedFacility = updatedAbout.campusFacility.id(facilityId);

    return res.status(200).json(
        new ApiResponse(200, updatedFacility, "Campus Facility Updated Successfully")
    );
});


const updateFaculityMember = asyncHandler(async (req, res) => {
    const { facultiMemberId } = req.params;
    const { fullName, role, subject, experience, photoUrl } = req.body


    const updateData = {};

    if(fullName) updateData.fullName = fullName
    if(role) updateData.role = role
    if(subject) updateData.subject = subject
    if(experience) updateData.experience = experience
    if(photoUrl) updateData.photoUrl = photoUrl

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "At least one field is required to update");
    }

    // 3. Find and update the specific array element
    const updatedAbout = await About.findOneAndUpdate(
        { "faculityMember._id": facultiMemberId },
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedAbout) {
        throw new ApiError(404, "faculity Member not found");
    }

    // 4. Extract only the updated facility to send back to the frontend
    const faculityMemberUpdate = updatedAbout.faculityMember.id(facultiMemberId);

    return res.status(200).json(
        new ApiResponse(200, faculityMemberUpdate, "Campus Facility Updated Successfully")
    );
});


const deleteCampusFacility = asyncHandler(async(req,res)=> {

    const { facilityId } = req.params

    console.log("facilityId",facilityId);


  const facility = await About.findOne({
      "campusFacility._id" : facilityId
  })

      console.log("facility",facility);

  if( !facility) {
      throw new ApiError(404, "Campus Facility not found")
  }

  await About.findOneAndUpdate({},{
      $pull : {
          campusFacility : { _id : facilityId}
      }
  }, { new : true})

  return res.status(200).json(new ApiResponse(200, {}, "Delete Campus Facility successfully"))
})

const deleteFaculityMember = asyncHandler(async(req,res)=> {

  const { facultiMemberId } = req.params


  const facultiMember = await About.findOne({
      "faculityMember._id" : facultiMemberId
  })

      console.log("facultiMember",facultiMember);

  if( !facultiMember) {
      throw new ApiError(404, "Faculty Member not found")
  }

  await About.findOneAndUpdate({},{
      $pull : {
          faculityMember : { _id : facultiMemberId}
      }
  }, { new : true})

  return res.status(200).json(new ApiResponse(200, {}, "Delete Faculty Member successfully"))
})


export {
  createAboutSection,
  updateSchoolHistory,
  updateMissionVision,
  updatePrincipleMessage,
  addCampusFacility,
  addFaculityMember,
  updateCampusFacility,
  updateFaculityMember,
  deleteCampusFacility,
  deleteFaculityMember,
  getAbout
}
