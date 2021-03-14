import React, { useState, useEffect } from 'react'
import './room_booking.scss'

function RoomBooking() {
  const [isAdultChildAction, setAction] = useState('')
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleRoomPlus = () => {
    if(rooms === 5){
      return
    }
    setRooms(rooms + 1)
  }

  const handleRoomMinus = () => {
    if(rooms === 1){
      return
    }
    setRooms(rooms - 1)
  }

  useEffect(() => {
    setAction('')
    let totalCount = adults + children
    if(totalCount < rooms){
      let diff = rooms - totalCount
      setAdults(adults + diff)
    }else if(totalCount > rooms){
      let maxCount = rooms * 4
      if(totalCount > maxCount){
        let diff = totalCount - maxCount
        if(children > 0 && children >= diff){
          setChildren(children - diff)
        }else if(children > 0 && children < diff){
          setChildren(0)
          diff = diff - children
          setAdults(adults - diff)
        }else {
          setAdults(adults - diff)
        }
      }
    }
  }, [rooms]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdultsPlus = () => {
    let totalCount = adults + children
    if(totalCount === 20){
      return
    }
    setAction('plus')
    setAdults(adults + 1)
  }

  const handleAdultsMinus = () => {
    if(adults === 1){
      return
    }
    setAction('minus')
    setAdults(adults - 1)
  }

  const handleChildrenPlus = () => {
    let totalCount = adults + children
    if(totalCount === 20){
      return
    }
    setAction('plus')
    setChildren(children + 1)
  }

  const handleChildrenMinus = () => {
    if(children === 0){
      return
    }
    setAction('minus')
    setChildren(children - 1)
  }

  useEffect(() => {
    if(!isAdultChildAction){
      return
    }
    let totalCount = adults + children
    let maxCount = rooms * 4
    if(totalCount > maxCount){
      setRooms(rooms + 1)
    }else if(totalCount < rooms){
      isAdultChildAction === 'minus' && setRooms(rooms - 1)
    }
  }, [adults, children]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="room-booking-comp" >
      <div className="title" > <span className="fa fa-users users-icon" ></span> Choose number of <strong>people</strong></div>
      <div className="room-booking-grid" >
        <div className="rooms" >
          <div className="text" >
            <span className="fa fa-bed rooms-icon" ></span>
            Rooms
          </div>
          <div className="actions" >
            <span className="fa fa-minus-circle minus-icon" onClick={handleRoomMinus} ></span>
            {rooms}
            <span className="fa fa-plus-circle plus-icon" onClick={handleRoomPlus} ></span>
          </div>
        </div>

        <div className="divider" ></div>

        <div className="adults" >
          <div className="text" >
            <span className="fa fa-user adults-icon" ></span>
            Adults
          </div>
          <div className="actions" >
            <span className="fa fa-minus-circle minus-icon" onClick={handleAdultsMinus} ></span>
            {adults}
            <span className="fa fa-plus-circle plus-icon" onClick={handleAdultsPlus} ></span>
          </div>
        </div>

        <div className="divider" ></div>

        <div className="children" >
          <div className="text" >
            <span className="fa fa-child children-icon" ></span>
            Children
          </div>
          <div className="actions" >
            <span className="fa fa-minus-circle minus-icon" onClick={handleChildrenMinus} ></span>
            {children}
            <span className="fa fa-plus-circle plus-icon" onClick={handleChildrenPlus} ></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBooking