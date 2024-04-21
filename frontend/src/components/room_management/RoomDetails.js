//class component
/*import React, {Component} from 'react'
import axios from 'axios';

export default class RoomDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            room:{}
        };
    }

    componentDidMount(){
        console.log(this.props); 
        const { match } = this.props;
       
        if (match && match.params && match.params.roomID) {
            const { roomID } = match.params;


        axios.get("http://localhost:8888/rooms/getRoom/${roomID}").then((res)=>{
            if(res.data){
                this.setState({
                    room:res.data
                });

            }
        }).catch(err => {
            console.log(err);
          });
        } else {
          console.log("Room ID not found in props.");
        }
      }
    render(){
        const { room } = this.state;
      return(
        
        <div>
              <h2>Room Details</h2>
              <p>Room ID: {room.roomID}</p>
              <p>Number of Beds: {room.numOfBeds}</p>
              <p>Bathroom Type: {room.bathroomType}</p>
              <p>Image: {room.image}</p>
              <p>Assigne Beds: {room.assignedBeds}</p>
              <p>Avaulability Status: {room.availabilityStatus}</p>
        </div>
        
      );
  
      
    }
      
}*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const [room, setRoom] = useState({});
  const { roomID } = useParams();

  useEffect(() => {
    if (roomID) {
      axios.get(`http://localhost:8070/rooms/getRoom/${roomID}`)
        .then((res) => {
          if (res.data) {
            setRoom(res.data.room);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Room ID not found in props.");
    }
  }, [roomID]);

  return (
    <div>
      <h2>Room Details</h2>
      <p>Room ID: {room.roomID}</p>
      <p>Number of Beds: {room.numOfBeds}</p>
      <p>Bathroom Type: {room.bathroomType}</p>
      <p>Image: {room.image}</p>
      <p>Assigne Beds: {room.assignedBeds}</p>
      <p>Avaulability Status: {room.availabilityStatus}</p>
      
    </div>
  );
};

export default RoomDetails;

