import React, { Fragment, useState } from 'react';
import axiosInstance from '../config';
import { toast } from 'react-toastify';

const CustomerCreateEdit = ({ closeModal, data, deleteCurrent }) => {
    const [customer, setCustomer] = useState(data ? data : {});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCustomer({ ...customer, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
    };

    const validateForm = () => {
        const newErrors = {};
        if (!customer.name || customer.name.trim() === "") newErrors.name = "Name is required.";
        if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email)) newErrors.email = "Valid email is required.";
        if (!customer.phonenumber || customer.phonenumber.trim() === "") newErrors.phonenumber = "Phone number is required.";
        if (!customer.address_line_1 || customer.address_line_1.trim() === "") newErrors.address_line_1 = "Address Line 1 is required.";
        if (!customer.address_line_2 || customer.address_line_2.trim() === "") newErrors.address_line_2 = "Address Line 2 is required.";
        if (!customer.country || customer.country.trim() === "") newErrors.country = "Country is required.";
        if (!customer.pin || customer.pin.trim() === "") {
            newErrors.pin = "Postal code is required.";
        } else if (!/^\d{4,6}$/.test(customer.pin)) {
            newErrors.pin = "Postal code must be 4-6 digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addRecord = () => {
        if (!validateForm()) return;

        try {
            axiosInstance.post('/api/add_customer', customer)
                .then(() => {
                    closeModal(false);
                    setCustomer({});
                    toast.success("Customer added successfully!");
                })
                .catch((e) => {
                    toast.error(e.response?.data?.message || "An error occurred.");
                });
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const updateRecord = () => {
        if (!validateForm()) return;

        try {
            axiosInstance.put('/api/update_customer', customer)
                .then(() => {
                    closeModal(false);
                    deleteCurrent({});
                    setCustomer({});
                    toast.success("Customer updated successfully!");
                })
                .catch((e) => {
                    toast.error(e.response?.data?.message || "An error occurred.");
                });
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Fragment>
            <div className="fixed bg-black/20 w-full h-screen top-0 left-0" onClick={closeModal}></div>
            <div className="w-[70%] min-h-[50%] fixed z-[50] top-1/2 left-1/2 bg-white translate-x-[-50%] translate-y-[-50%] p-4 rounded-lg shadow-lg border">
                <div className="flex">
                    <h1 className="text-teal-900 font-bold">{data ? "UPDATE CUSTOMER" : "CREATE CUSTOMER"}</h1>
                    <button type="button" className="absolute right-[30px]" onClick={closeModal}>x</button>
                </div>
                <div className="py-4 grid grid-cols-2 gap-4">
                    <div className="w-full">
                        <label htmlFor="name" className="block text-[14px] mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.name ? "border-red-500" : ""}`}
                            placeholder="Enter your name"
                            name="name"
                            onChange={handleChange}
                            value={customer.name || ""}
                        />
                        {errors.name && <span className="text-red-500 text-[12px]">{errors.name}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-[14px] mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.email ? "border-red-500" : ""}`}
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                            value={customer.email || ""}
                        />
                        {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
                    </div>
                </div>
                <div className="py-4 grid grid-cols-2 gap-4">
                    <div className="w-full">
                        <label htmlFor="phonenumber" className="block text-[14px] mb-2 font-medium">Phone number</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.phonenumber ? "border-red-500" : ""}`}
                            placeholder="Enter your phone number"
                            name="phonenumber"
                            onChange={handleChange}
                            value={customer.phonenumber || ""}
                        />
                        {errors.phonenumber && <span className="text-red-500 text-[12px]">{errors.phonenumber}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="address_line_1" className="block text-[14px] mb-2 font-medium">Address Line 1</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.address_line_1 ? "border-red-500" : ""}`}
                            placeholder="Enter your address"
                            name="address_line_1"
                            onChange={handleChange}
                            value={customer.address_line_1 || ""}
                        />
                        {errors.address_line_1 && <span className="text-red-500 text-[12px]">{errors.address_line_1}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="address_line_2" className="block text-[14px] mb-2 font-medium">Address Line 2</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.address_line_2 ? "border-red-500" : ""}`}
                            placeholder="Enter your address"
                            name="address_line_2"
                            onChange={handleChange}
                            value={customer.address_line_2 || ""}
                        />
                        {errors.address_line_2 && <span className="text-red-500 text-[12px]">{errors.address_line_2}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="country" className="block text-[14px] mb-2 font-medium">Country</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.country ? "border-red-500" : ""}`}
                            placeholder="Enter your country"
                            name="country"
                            onChange={handleChange}
                            value={customer.country || ""}
                        />
                        {errors.country && <span className="text-red-500 text-[12px]">{errors.country}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="pin" className="block text-[14px] mb-2 font-medium">Postal code</label>
                        <input
                            type="text"
                            className={`border px-3 py-2 w-full rounded focus-within:outline-none ${errors.pin ? "border-red-500" : ""}`}
                            placeholder="Enter your PIN"
                            name="pin"
                            onChange={handleChange}
                            value={customer.pin || ""}
                        />
                        {errors.pin && <span className="text-red-500 text-[12px]">{errors.pin}</span>}
                    </div>
                </div>
                <div className="flex justify-end fixed bottom-0 right-0 pb-4 pe-4">
                    <button
                        type="button"
                        className="bg-teal-800 px-4 py-3 rounded text-white"
                        onClick={Object.keys(data).length > 0 ? updateRecord : addRecord}
                    >
                        {Object.keys(data).length > 0 ? "Update Customer" : "Save Customer"}
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomerCreateEdit;
