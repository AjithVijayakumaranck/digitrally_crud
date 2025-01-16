import { toast } from "react-toastify";
import axiosInstance from "../../config";
import { useState } from "react";

const Table = ({ header, rows , setCustomer , setIsModalOpen}) => {

    const [loading,setLoading] = useState(false)

    const selectCustomer = (rowData) => {
        setCustomer(rowData)
        setIsModalOpen(true)
    }

    const deleteCustomer = (rowData) => {
       try {
        setLoading(true)
        setCustomer(rowData)
        axiosInstance.delete(`/api/delete_customer/${rowData._id}`).then((response)=>{
            setLoading(false)
            setCustomer({})
            toast.success("user deleted")
        })
       } catch (error) {
        setLoading(false)
        setCustomer({})
        toast.error("user deleted")
       }
    }

    return (
        <table className="table">
            <thead className="">
                <tr className="">
                    {header.map((header, key) => (
                        <th  className="" key={key}>{header.header}</th>
                    ))}
       
                </tr>
            </thead>

            <tbody>
                {rows.map((rowData, index) => {
            
                    
                    if(rows.length === 0){ 
                        return (
                           <p>no vusstomer found</p>
                        )
                    } else{
                        return (
                            <tr key={index} >
                                <td>
                                    {rowData.name}
                                </td>
                                <td>
                                    {rowData.phonenumber}
                                </td>
                                <td>
                                    {rowData.email}
                                </td>
                                <td >
                                    <p>{rowData.address_line_1}</p>
                                    <p>{rowData.address_line_2}</p>
                                </td>
                                <td>
                                    {rowData.country}
                                </td>
                                <td>
                                    {rowData.pin}
                                </td>
                                <td className="">
                                 <button className=" mx-2 bg-teal-900 text-white rounded-full px-3 py-2" onClick={()=> selectCustomer(rowData)}>Update User</button>
                        
                                <button disabled={loading} onClick={()=> deleteCustomer(rowData)} className="bg-teal-900 text-white rounded-full px-3 py-2">Delete User</button>
                                </td>
                            </tr>
                        );
                    }

                    
                })}
            </tbody>
        </table>
    );
};

export default Table;