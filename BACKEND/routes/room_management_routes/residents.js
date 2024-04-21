const router = require("express").Router();
let Residents = require("../../models/room_management_models/residents");
let Rooms = require("../../models/room_management_models/rooms");




router.route("/addResident").post(async(req,res)=>{

    const resName = req.body.resName;
    const NIC = req.body.NIC;
    const roomID = req.body.roomID;
    

    try{
        // Check if the room exists
        const room = await Rooms.findOne({roomID});
        if(!room){
            return res.status(404).json({message:" Room not found"});
        }

         // Check if the room is available
        if(room.availabilityStatus !=='Available'){
            return res.status(400).json({message: "Room is not available"});
        }
        
         // Create a new resident
        const newResidents = new Residents({
            resName,
            NIC,
            roomID
    
        });
        await newResidents.save();

        // Update room availability details
        room.assignedBeds += 1;
        if(room.assignedBeds>= room.numOfBeds){
            room.availabilityStatus = 'Not Available';
        }
        await room.save();

        return res.status(200).json({ message: "Resident assigned to room successfully" });

    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal serever error"});
    }
    
    

})

router.route("/getResidents").get((req,res)=>{
    Residents.find().then((residents)=>{
        res.json(residents)
    }).catch((err)=>{
        console.log(err)
    })

    
})

router.route("/updateResident/:NIC").put(async(req,res)=>{
    const nic = req.params.NIC;
    const {resName,
           NIC : newNIC,
           roomID: newRoomID} = req.body;


   try{
    //Find the resident to be updated
    const resident = await Residents.findOne({NIC:nic});
    if(!resident){
        return res.status(404).send({status:"Resident no found"});
    }

    //Retrieve the current roomID of the resident
    const currentRoomID = resident.roomID;

    //Update the resident's details with the new room ID
    resident.resName = resName;
    resident.NIC = newNIC;
    resident.roomID = newRoomID;
    await resident.save();

    //Find the current room associated with the resident
    const currentRoom = await Rooms.findOne({roomID: currentRoomID});
    if(!currentRoom){
        return res.status(404).send({status: "Current room not found"});
    }

    //Update the current room's assigned beds count and availability status
    currentRoom.assignedBeds -= 1;
    if(currentRoom.assignedBeds < currentRoom.numOfBeds){
        currentRoom.availabilityStatus = 'Available';
    }
    await currentRoom.save();

    //Find the new room using provided room ID
    const newRoom = await Rooms.findOne({roomID: newRoomID});
    if(!newRoom){
        return res.status(404).send({status: "New room not found"});
    }

    //Update the new room's assigned beds count and availability status
    newRoom.assignedBeds += 1;
    if(newRoom.assignedBeds >= newRoom.numOfBeds){
        newRoom.availabilityStatus = 'Not Available';
    }
    await newRoom.save();

    return res.status(200).send({status: "Resident allocation details updated"});
    }catch(error){
        console.log(error);
        return res.status(500).send({ status: "Error with updating data", error: error.message });
    }
   
})

router.route("/deleteResident/:NIC").delete(async(req, res) =>{
    let nic = req.params.NIC;

    try{
        // Find the resident to be deleted
        const resident = await Residents.findOneAndDelete({NIC:nic});
        if(!resident){
            return res.status(404).send({status:"Resident not found"});
        }

        // Find the associated room
        const room = await Rooms.findOne({roomID:resident.roomID});
        if(!room)
        {
            return res.status(404).send({status:"Room not found"});
        }

        // Update room availability details
        room.assignedBeds -= 1;
        if(room.assignedBeds < room.numOfBeds){
            room.availabilityStatus = 'Available';
        }
        await room.save();

        return res.status(200).send({status:"Resident allocation deleted"});
    }catch(error){
        console.log(error.message);
        return resstatus(500).send({status:"Error deleting resident allocation", error:error.message});
    }
})

router.route("/getResident/:NIC").get(async(req,res)=>{
    let nic = req.params.NIC;
    try{
        resident = await Residents.findOne({NIC: nic});
    if (resident) {
        res.status(200).send({status: "Room allocation Fetched", resident});
    } else {
        res.status(404).send({status: "Room allocation not found"});
    }
    }catch(err){
        console.log(err.message);
        res.status(500).send({status: "Error with get resident allocation details", error:err.message});
    }
})



module.exports = router;