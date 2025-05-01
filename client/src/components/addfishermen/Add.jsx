import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import "./add.css"
import toast from "react-hot-toast";
import formimg1 from "../../backgroundimage/fishermenProfile_formimg1.jpg";
import formimg2 from "../../backgroundimage/fishermenProfile_formimg2.png";
import formimg3 from "../../backgroundimage/fishermenProfile_formimg3.jpg";

const Addfishermen = () => {
    
    const fishermens = {
        name: "",
        age: "",
        nic: "",
        address: "",
        experience: "",
        trip: "",
        contact_number: "",
        availability: "",
        salary: ""
    }
    
    const [fishermen, setFishermen] = useState(fishermens);
    const [isFormEmpty, setIsFormEmpty] = useState(true);
    const [error, setError] = useState('');
    const [imageIndex, setImageIndex] = useState(0);
    const images = [formimg1, formimg2, formimg3];
    const navigate = useNavigate();

    const updateImageIndex = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(updateImageIndex, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFishermen({ ...fishermen, [name]: value });
    }

    const nameinputHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const expinputHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/\D/g, '').slice(0, 7);
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const ageinputHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/\D/g, '').slice(0, 7);
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const nicInputHandler = (e) => {
        const { name, value } = e.target;
        let filteredValue = value.replace(/[^0-9xXvV]/g, '');
        if (filteredValue.length > 12) {
            filteredValue = filteredValue.slice(1, 12);
        }
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const contactinputHandler = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/\D/g, '').slice(0, 10);
        setFishermen({ ...fishermen, [name]: filteredValue });
    }

    const validateName = (value, setError) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(value)) {
            setError('Invalid character');
            toast.error(value + ' is an Invalid Name!!!\nName can only contain alphabetic characters', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-name-error'
            });
            return false;
        }
        setError('');
        return true;
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        validateName(value, setError);
    };

    const validateNIC = (nic, setError) => {
        setError('');  // Clear previous errors
    
        // Check if the NIC is less than 12 characters
        if (nic.length < 12) {
            setError('NIC must be 12 characters long.');
            toast.error('NIC must be 12 characters long.', {
                position: 'top-right',
                autoClose: 0,
                toastId: 'nic-length-error'
            });
            return false;
        }
    
        // Validate the first 9 digits (only digits)
        const firstNineDigits = nic.slice(0, 9);
        if (!/^\d+$/.test(firstNineDigits)) {
            setError('First nine characters must be digits.');
            toast.error('First nine characters must be digits.', {
                position: 'top-right',
                autoClose: 0,
                toastId: 'invalid-nicFirstNine-error'
            });
            return false;
        }
    
        // If validation passes, return true
        return true;
    };

    const handleInputChangeNIC = (event) => {
        const { value } = event.target;
        validateNIC(value, setError);
    };

    const validateExperience = (experience, setError) => {
        setError('');
        if (!/^\d+$/.test(experience)) {
            setError('Product Price must be digits.');
            toast.error('\'' + experience + '\'' + ' is an invalid character' + '\nProduct Price must be digits.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-Experiencedigitdd-error'
            });
            return false;
        }
        const experienceNumber = parseInt(experience);
        if (experienceNumber < 0) {
            setError('Product Price must be greater than 0.');
            toast.error('Product Price must be greater than 0', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-Experience-error'
            });
            return false;
        }
        return true;
    };

    const handleInputChangeExp = (event) => {
        const { value } = event.target;
        validateExperience(value, setError);
    };

    const validateContactNumber = (contactNumber, setError) => {
        setError('');
        if (contactNumber.length !== 10 || !/^\d+$/.test(contactNumber)) {
            setError('Contact number must be exactly 10 digits.');
            toast.error('Contact number must be exactly 10 digits.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-Contact-error'
            });
            return false;
        }
        return true;
    }

    const handleInputChangeContact = (event) => {
        const { value } = event.target;
        validateContactNumber(value, setError);
    };

    const validateAge = (age, setError) => {
        setError('');
        if (!/^\d+$/.test(age)) {
            setError('Supplier ID should contain digits.');
            toast.error('\'' + age + '\'' + ' is an invalid character' + '\nSupplier ID should contain digits.', {
                position: 'top-center',
                autoClose: 1000,
                toastId: 'invalid-age-char-error'
            });
            return false;
        }
        return true;
    };

    const handleInputChangeAge = (event) => {
        const { value } = event.target;
        validateAge(value, setError);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (isFormEmpty) {
            toast.error('Please fill out all fields before submitting.', { position: 'top-center' });
            return;
        }

        if (!/^\d+$/.test(fishermen.age)) {
            setError('Supplier ID cannot contain letters.');
            toast.error('Supplier ID cannot contain letters.', { position: 'top-center' });
            return;
        }

        const age = parseInt(fishermen.age);
        if (age < 0 || age > 10000) {
            toast.error("Supplier ID should contain digits!!!", { position: "top-center" });
            return;
        }

        if (isNaN(parseInt(fishermen.experience)) || parseInt(fishermen.experience) <= 0) {
            toast.error('Product Price must be greater than 0.', { position: "top-center" });
            return;
        }

        if (!/^\d+$/.test(fishermen.experience)) {
            toast.error('Produce price must be digits.', { position: 'top-center' });
            return;
        }

        if (fishermen.contact_number.length !== 10) {
            toast.error("Contact Number should contain 10 digits.", { position: "top-center" });
            return;
        }

        if (!/^\d+$/.test(fishermen.contact_number)) {
            toast.error('Contact Number must be digits.', { position: 'top-center' });
            return;
        }

        if (fishermen.availability === "") {
            toast.error('Select the Availability.', { position: 'top-center' });
            return;
        }

        await axios.post("http://localhost:4000/api/fishermen/createFishermen", fishermen)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                navigate("/fishermenprofiles");
            }).catch(error => console.log(error));
    }

    useEffect(() => {
        const checkFormEmpty = () => {
            for (const key in fishermen) {
                if (fishermen[key] !== '') {
                    setIsFormEmpty(false);
                    return;
                }
            }
            setIsFormEmpty(true);
        };

        checkFormEmpty();
    }, [fishermen]);

    return (
        <div className="addFishermen">
            <div className="Fishermen_container">
                <div className="Fishermen_image-container">
                    <img
                        src={images[imageIndex]}
                        alt="Fish Image"
                        className="Fishermen_fish-image"
                    />
                </div>
                <div className="Fishermen_form-container">
                    <div className="Fishermen_header">
                        <h2 className="Fishermen_form-title">Add New Supplier</h2>
                    </div>
                    <form className="addFishermenForm" onSubmit={submitForm}>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="name">Name</label> <br />
                            <input type="text" onChange={(event) => { nameinputHandler(event); handleInputChange(event); }} value={fishermen.name} id="name" name="name" autoComplete='off' placeholder="Enter name" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="age">Supplier ID</label> <br />
                            <input type="text" onChange={(event) => { ageinputHandler(event); handleInputChangeAge(event); }} value={fishermen.age} id="age" name="age" autoComplete='off' placeholder="Enter ID" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="nic">NIC</label> <br />
                            <input type="text" onChange={(event) => { nicInputHandler(event); handleInputChangeNIC(event); }} value={fishermen.nic} id="nic" name="nic" autoComplete='off' placeholder="0123456789 'X' or 'V'" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="address">Product Type</label> <br />
                            <input type="text" onChange={inputHandler} id="address" name="address" autoComplete='off' placeholder="Product Type" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="experience">Product Price</label> <br />
                            <input type="text" onChange={(event) => { expinputHandler(event); handleInputChangeExp(event); }} value={fishermen.experience} id="experience" name="experience" autoComplete='off' placeholder="Enter Price" />
                        </div>
                        <div className='Fishermen_inputGroup'>
                            <label htmlFor="trip">Supply time</label> <br />
                            <select onChange={inputHandler} id="trip" name="trip">
                                <option value="0">Select Method</option>
                                <option value="2">2 weeks</option>
                                <option value="4">4 weeks</option>
                            </select>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="contact_number">Contact Number</label> <br />
                            <input type="text" onChange={(event) => { contactinputHandler(event); handleInputChangeContact(event); }} value={fishermen.contact_number} id="contact_number" name="contact_number" autoComplete='off' placeholder="0123456789" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="availability">Availability</label> <br />
                            <select onChange={inputHandler} id="availability" name="availability">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="Fishermen_inputGroup">
                            <label htmlFor="salary">Quantity</label> <br />
                            <input type="text" onChange={inputHandler} id="salary" value={fishermen.salary} name="salary" autoComplete='off' placeholder="quantity" />
                        </div>
                        <div className="Fishermen_inputGroup">
                            <center>
                                <button type="submit" className='Fishermen_submitButton'>ADD Supplier</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addfishermen;
