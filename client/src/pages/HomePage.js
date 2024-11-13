import React from "react"
import axios from "axios";
export default function Homepage(){
    React.useEffect(()=>{
        async function updateHotelReservationStatus(){
            try{
                const response=await axios.get('http://localhost:8000/api/v1/admins/updateHotelReservationStatuses');
                console.log(response.data.data)
            }catch(error){
                console.log(error?.response.data.error)
            }
        }
        async function updateFlightReservationStatus(){
            try{
                const response=await axios.get('http://localhost:8000/api/v1/admins/updateFlightReservationStatuses');
                console.log(response.data.data)
            }catch(error){
                console.log(error?.response.data.error)
            }
        }
        updateHotelReservationStatus();
        updateFlightReservationStatus();

    },[])
    return (
        <>
            <p>para </p>
            <p>para </p>
            <p>para </p>
            <p>para </p>
            <p>para </p>
            <p>para </p>
            </>
            
    )
}