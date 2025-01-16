import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Table from '../components/Table'
import CreateCustomer from '../components/customerCreateEdit'
import axiosInstance from '../config'

const Customer = () => {

  const [customers, setCustomers] = useState([]);
  const [customer,setCustomer] = useState({})
  const [isModalOpen,setIsModalOpen] = useState(false)

  const headers = [
    {
      header: "Name",
    },
    {
      header: "Phone number",
    },
    {
      header: "Email",
    },
    {
      header: "Address",
    },
    {
      header: "Country",
    },
    {
      header: "Pin",
    },
    {
      header: "Actions",
    },

  ]
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        axiosInstance.get('/api/get_customers').then((response)=>{
          console.log(response);
          setCustomers(response.data)
        })
      } catch (error) {
        console.log(error);

      }
    }
    fetchCustomer()
  }, [isModalOpen,customer])

  const openModal = ()=>  setIsModalOpen(true)
  return (
    <Fragment>
    <div className='custom-container p-4 pt-24'>
     
        <div className='flex justify-between mb-3 '>
        <h1 className='font-bold text-4xl'><span className='text-teal-800'>Customer</span> Data</h1>
        <button type='button' className='bg-teal-800 px-4 py-3 rounded-full text-white' onClick={openModal}>Add Customer</button>
        </div>
      <div className='border rounded-lg overflow-hidden'>
        <Table rows={customers} header={headers} setCustomer={setCustomer} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
    {isModalOpen && <CreateCustomer closeModal={()=> setIsModalOpen(false)} data={customer} deleteCurrent={setCustomer} /> }
    </Fragment> 
  )
}

export default Customer