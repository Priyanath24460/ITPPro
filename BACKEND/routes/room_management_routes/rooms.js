const router = require("express").Router();
let Rooms = require("../../models/room_management_models/rooms");


router.route("/addRoom").post((req,res)=>{

    const roomID = req.body.roomID;
    const numOfBeds = Number(req.body.numOfBeds);
    const bathroomType = req.body.bathroomType;
    const image = req.body.image;
    const assignedBeds = Number(req.body.assignedBeds);
    const availabilityStatus = req.body.availabilityStatus;
    

    const newRooms = new Rooms({
        roomID,
        numOfBeds,
        bathroomType,
        image,
        assignedBeds,
        availabilityStatus,
       

    })

    newRooms.save().then(()=>{
        res.json("Room Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/getRooms").get((req,res)=>{
    Rooms.find().then((rooms)=>{
        res.json(rooms)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/updateRoom/:roomID").put(async(req,res)=>{
    let roomId = req.params.roomID;
    const {roomID,
        numOfBeds,
        bathroomType,
        image,
        assignedBeds,
        availabilityStatus} = req.body;

    const updateRoom = {
        roomID,
        numOfBeds,
        bathroomType,
        image,
        assignedBeds,
        availabilityStatus
    }

    const update = await Rooms.findOneAndUpdate({roomID: roomId},updateRoom)
    .then(()=>{
        res.status(200).send({status: "Room updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })

    
})

router.route("/deleteRoom/:roomID").delete(async(req, res) =>{
    try {
        const roomId = req.params.roomID;
        
        await Rooms.findOneAndDelete({ roomID: roomId });
        res.status(200).send({ status: "Room Deleted" });
      } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting room", error: err.message });
      }

})


router.route("/getRoom/:roomID").get(async(req,res)=>{
    let roomId = req.params.roomID;
    try{
        room = await Rooms.findOne({roomID: roomId});
    if (room) {
        res.status(200).send({status: "Room Fetched", room});
    } else {
        res.status(404).send({status: "Room not found"});
    }
    }catch(err){
        console.log(err.message);
        res.status(500).send({status: "Error with get room", error:err.message});
    }
})

module.exports = router;

