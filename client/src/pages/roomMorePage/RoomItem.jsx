import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Carousel } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import BookingModal from "./BookingModal";
import { useQueryRoomsDate } from "../../hooks/useSearchBookedDate";
import { generateDateRange } from "../../utils/helpers";
import { useNewCartItem } from "../../hooks/useNewCartItem";
import ConfPopup from "../roomPage/ConfPopup";

const RoomCarousel = React.memo(({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelect = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  const handleThumbnailClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  return (
    <div className="roomCarousel">
      <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
        {images.map((img, imgIndex) => (
          <Carousel.Item key={imgIndex}>
            <img
              src={img}
              alt={`房間圖片 ${imgIndex + 1}`}
              className="d-block w-100"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="thumbnails">
        {images.slice(1).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`縮略圖 ${i + 2}`}
            onClick={() => handleThumbnailClick(i + 1)}
          />
        ))}
      </div>
    </div>
  );
});

// 主要的 RoomItem 組件
const RoomItem = React.memo(({ room, index }) => {
  const [toggleBookingModal, setToggleBookingModal] = useState(false);
  const [bookedDate, setBookedDate] = useState([]);

  const {
    mutate: searchRoomsDate,
    isLoading,
    data: bookedDatesData,
  } = useQueryRoomsDate();

  const {
    mutate: newCartItem,
    isLoading: addingItem,
    data: item,
    errors,
  } = useNewCartItem();

  const handleOpenCalendar = useCallback(
    (index) => {
      searchRoomsDate(index);
      setToggleBookingModal(true);
    },
    [searchRoomsDate, room.id]
  );

  const getIconClass = useCallback((iconName) => {
    const cleanName = iconName.replace(/^fa-/, "");
    const prefix = iconName.includes("fa-solid") ? "fas" : "fa";
    return `${prefix} fa-${cleanName}`;
  }, []);

  const getBackgroundImageClass = useCallback((roomType) => {
    switch (roomType) {
      case "Grass Tempo":
        return "backgroundImageGrass";
      case "Island Trails":
        return "backgroundImageIsland";
      case "Ocean Serenity":
        return "backgroundImageOcean";
      case "Starry Dome":
        return "backgroundImageStarry";
      default:
        return "";
    }
  }, []);

  useEffect(() => {
    if (bookedDatesData) {
      const allBookedDates = bookedDatesData.flatMap(
        ({ check_in_date, check_out_date }) =>
          generateDateRange(
            new Date(check_in_date),
            new Date(check_out_date)
          ).map((date) => new Date(date))
      );
      setBookedDate(allBookedDates);
    }
  }, [bookedDatesData]);

  const memoizedRoomCarousel = useMemo(
    () => <RoomCarousel images={room.images} />,
    [room.images]
  );

  if (isLoading) return <div>Loading..</div>;

  return (
    <div
      id={room.roomTypeEng.toLowerCase().replace(/\s+/g, "")}
      className={`roomItem ${index % 2 === 0 ? "even" : "odd"}`}
    >
      {memoizedRoomCarousel}
      <div className="roomInfo">
        <div className={getBackgroundImageClass(room.roomTypeEng)}></div>
        <h2 className="roomTypeEng">{room.roomTypeEng}</h2>
        <h3 className="roomType">{room.roomType}</h3>
        <p className="roomMoreSlogan">{room.roomSlogan}</p>
        <p className="roomDesc">{room.roomDesc}</p>
        <div className="roomTags">
          {room.roomTags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="roomDetails">
          {room.roomDetails.map((detail, i) => (
            <div key={i} className="detailItem">
              <i className={getIconClass(detail.icon)}></i>
              <span>{detail.text}</span>
              <span>{detail.subtext}</span>
            </div>
          ))}
        </div>
        <div className="roomActions">
          <p className="roomMemo">{room.roomMemo}</p>
          <a href="#roomFacilities" className="checkFacilities">
            查看設備
          </a>
          <button
            onClick={() => {
              handleOpenCalendar(index);
            }}
            className="checkFacilities"
          >
            立即預約
          </button>
          <div
            className={`roomsPage ${toggleBookingModal ? "modal-open" : ""}`}
          >
            <BookingModal
              toggleBookingModal={toggleBookingModal}
              setToggleBookingModal={setToggleBookingModal}
              index={index}
              bookedDate={bookedDate}
              roomId={index}
              price={room.price}
              roomType={room.roomType}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default RoomItem;