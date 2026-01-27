import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointments = () => {
  // store Doc id from URL
  const { docId } = useParams();
  const { doctors,currencySynbol } = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  //state variable to save this docInfo information
  const [docInfo, setDocInfo] = useState(null);

  //state variable for doctors Time and date
  const [docSlot,setDocSlot] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('')

  // find particualr doc for the above doctors array
  const fetchDocIndo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo)
    // console.log(docInfo);  // print all doc info in console
    
  };

  // ----------------Get Available Slots ----------------------
  const getAvailableSlots = async () => {
    setDocSlot([])

    //  getting current date
    let today = new Date()

    // 7 day from today
    for (let i = 0; i < 7; i++) {
      // getting date with index 
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)     

      // setting end time of date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      // setting hours
    // ✅ Today's slots start from next available time
    if (i === 0) {
      currentDate.setHours(
        currentDate.getHours() >= 10
          ? currentDate.getHours() + 1
          : 10
      );
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

      let timeSlots = []
      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleString([],{hour: '2-digit', minute:'2-digit'})

        // add slot to arrat timeSlots[]
        timeSlots.push({
          datetime:new Date(currentDate),
          time : formattedTime
        })

        // increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
        // ✅ अगर empty slot है तो add मत करो
    if (timeSlots.length > 0) {
      setDocSlot((prev) => [...prev, timeSlots]);
    }
    }
  }

  //Run this above function whenever our page gets Loaded for this we use 
  //useEffect Hook
  useEffect(()=>{
    fetchDocIndo()
  },[doctors,docId])    // any of theese 2 dependency array get changed then it will run

  //use effect for Slots
  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

  //view time slots data 
  useEffect(()=>{
    console.log(docSlot);  
  },[docSlot])


  return docInfo && (
  <div>
  <div className="flex flex-col sm:flex-row gap-4">
    {/* -------------- Doctors Details image ---------------- */}
    <div>
        <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="image" />
    </div>

    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
      
      {/* ------------------------DocInfo name degree and Experience-----------------*/}
      <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 ">
        {docInfo.name} 
        <img className="w-5" src={assets.verified_icon} alt="" />
      </p>
      <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
      </div>

      {/* ------------------------DocInfo About---------------- */}
      <div >
        <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
          About <img src={assets.info_icon} alt="infoIcon" /></p>
        <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
      </div>
      <p className="text-gray-500 font-medium mt-4">
        Appointment fee: <span className="text-gray-600">{currencySynbol}{docInfo.fees}</span>
      </p>
    </div>
    </div>

        {/* --------------Booking Slots------------ */}
    <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
      <p>Booking slots</p>
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {
          docSlot.length >0 && docSlot.map((item,index)=>( //>0
            <div onClick={()=>{setSlotIndex(index)}}
            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white ': 'border border-gray-200' }`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
      </div>
          {/* // time set div */}
      <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
        {docSlot.length && docSlot[slotIndex].map((item,index)=>(
          <p onClick={() =>{setSlotTime(item.time)}} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ?'bg-primary text-white': 'text-gray-400 border border-gray-300'}`} key={index}>
            {item.time.toLowerCase()}
          </p>
        ))}
      </div>

      <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
    </div>

  </div>
  )
};

export default Appointments;
