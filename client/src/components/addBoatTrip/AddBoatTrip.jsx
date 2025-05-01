import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../addBoatTrip/AddBoatTrip.css";
import formimg1 from "../../backgroundimage/boattrip1.jpg";
import formimg2 from "../../backgroundimage/boattrip2.jpg";
import formimg3 from "../../backgroundimage/boattrip3.jpg";

const AddBoatTrip = () => {
  const initialBoatTripState = {
    tripID: "",
    boatName: "",
    tripType: "",
    passengerCount: "",
    travelDistance: "",
    rentalCost: "",
    fuelRequired: ""
  };

  const [boatTrip, setBoatTrip] = useState(initialBoatTripState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const images = [formimg1, formimg2, formimg3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBoatTrip((prev) => ({
      ...prev,
      [name]: name === "boatName" ? value.replace(/[^\w\s]/gi, "") : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { tripID, boatName, tripType, passengerCount, travelDistance, rentalCost, fuelRequired } = boatTrip;

    if (!tripID) newErrors.tripID = "Trip ID is required";
    if (!boatName) newErrors.boatName = "Boat Name is required";
    if (!tripType) newErrors.tripType = "Trip Type is required";
    if (!passengerCount) newErrors.passengerCount = "Passenger count is required";
    if (!travelDistance) newErrors.travelDistance = "Travel distance is required";
    if (!rentalCost) newErrors.rentalCost = "Rental cost is required";
    if (!fuelRequired) newErrors.fuelRequired = "Fuel required is required";

    if (parseInt(passengerCount) < 1 || parseInt(passengerCount) >= 15) {
      newErrors.passengerCount = "Number of passengers must be between 1 and 14";
    }
    if (parseInt(travelDistance) < 100) {
      newErrors.travelDistance = "Travel distance must be greater than 100 miles";
    }
    if (parseInt(rentalCost) <= 0) {
      newErrors.rentalCost = "Rental cost must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Map frontend names to backend schema fields
    const mappedData = {
      tripID: boatTrip.tripID,
      boatName: boatTrip.boatName,
      tripType: boatTrip.tripType,
      noOfEmployees: boatTrip.passengerCount,
      fishingCaught: boatTrip.travelDistance,
      costAvg: boatTrip.rentalCost,
      profitAvg: boatTrip.fuelRequired
    };

    try {
      const response = await axios.post("http://localhost:4000/api/boattrip/createboattrip", mappedData);
      if (response.status === 200) {
        toast.success("Boat trip added successfully", { position: "top-right" });
        navigate(-1);  // Go back to the previous page
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add boat trip", { position: "top-right" });
    }
  };

  return (
    <div className="AddBoatTrip">
      <div className="container">
        <div className="image-container">
          <img src={images[imageIndex]} alt="Boat" className="boat-image" />
        </div>
        <div className="form-container">
          <h2 className="form-title">Add New Boat Trip</h2>
          <form className="form" onSubmit={submitForm}>
            <div className="inputGroup">
              <label htmlFor="tripID">Trip ID</label>
              <input
                type="number"
                name="tripID"
                value={boatTrip.tripID || ""}
                onChange={inputHandler}
                placeholder="Trip ID"
              />
              {errors.tripID && <span className="error">{errors.tripID}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="boatName">Boat Name</label>
              <input
                type="text"
                name="boatName"
                value={boatTrip.boatName || ""}
                onChange={inputHandler}
                placeholder="Boat Name"
              />
              {errors.boatName && <span className="error">{errors.boatName}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="tripType">Trip Type</label>
              <select name="tripType" value={boatTrip.tripType || ""} onChange={inputHandler}>
                <option value="">Select Trip Type</option>
                <option value="one_day">One Day</option>
                <option value="one_week">One Week</option>
                <option value="one_month">One Month</option>
              </select>
              {errors.tripType && <span className="error">{errors.tripType}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="passengerCount">No Of Passengers Joining</label>
              <input
                type="number"
                name="passengerCount"
                value={boatTrip.passengerCount || ""}
                onChange={inputHandler}
                placeholder="No Of Passengers (between 1 - 14)"
              />
              {errors.passengerCount && <span className="error">{errors.passengerCount}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="travelDistance">Estimated travel distance (miles)</label>
              <input
                type="number"
                name="travelDistance"
                value={boatTrip.travelDistance || ""}
                onChange={inputHandler}
                placeholder="Distance in miles (must greater than 100 miles)"
              />
              {errors.travelDistance && <span className="error">{errors.travelDistance}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="rentalCost">Rental Cost</label>
              <input
                type="number"
                name="rentalCost"
                value={boatTrip.rentalCost || ""}
                onChange={inputHandler}
                placeholder="Cost in Rupees"
              />
              {errors.rentalCost && <span className="error">{errors.rentalCost}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="fuelRequired">Fuel required</label>
              <input
                type="number"
                name="fuelRequired"
                value={boatTrip.fuelRequired || ""}
                onChange={inputHandler}
                placeholder="Fuel in Rupees"
              />
              {errors.fuelRequired && <span className="error">{errors.fuelRequired}</span>}
            </div>

            <div className="inputGroup">
              <center>
                <button type="submit" className="submitButton">Add Trip</button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBoatTrip;
