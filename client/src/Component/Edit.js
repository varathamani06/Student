import React,{useEffect, useState} from 'react'

import TextField  from '@mui/material/TextField';
import { Button } from '@mui/material';

import DateObject from 'react-date-object';

import dayjs, { isDayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DateField } from '@mui/x-date-pickers/DateField';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';




function Edit() {

    const{id}=useParams();
    console.log(id);
    

    const navigate=useNavigate();
    const [value,setvalue]=useState(dayjs(new Date));
    
    const[inputData,setinputData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        date:setvalue,
        education:"",location:"",about:""
    });
   
    
    useEffect(()=>{
        axios.get("http://localhost:8088/read/"+id).then((res)=>{
            console.log(res.data.data[0],"editjsfile");
            
            setinputData(res.data.data[0])}).catch((err)=>{
            console.log(err.message);
            
        })
    },[])
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put("http://localhost:8088/edit/"+id,inputData).then((res)=>{
            alert("data updated successfully")
            navigate("/")
        })
    }
    
  return (
   <>
       <div className="container mt-3">
            <h2>Add Student Details</h2>
            <form action="" onSubmit={handleSubmit} >

                <div className="row">

                

                <div className="col-md-6 mt-3">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="" className='text-center'>First Name:</label>
                        </div>
                        <div className="col-8">
                        <TextField id="outlined-basic" label="" variant="outlined"
                        placeholder='Enter your first name' fullWidth value={inputData.firstname}
                        onChange={e=>{setinputData({...inputData,firstname:e.target.value})}}/>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Last Name:</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic" placeholder="Enter your last name"  variant="outlined" fullWidth value={inputData.lastname}
                   onChange={e=>{setinputData({...inputData,lastname:e.target.value})}} 
                  />
                   </div>
                  </div>
                </div>
  
                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Email:</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic" placeholder="Enter your Email"  variant="outlined" fullWidth type='email' value={inputData.email}
                   onChange={e=>{setinputData({...inputData,email:e.target.value})}}
                   />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Date:</label>
                   </div>
                   <div className="col-8 " >
                   <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker', 'DatePicker']}>
      
       
        <DatePicker label="" value={value} onChange={e=>{setinputData({...inputData,date:e.format("DD/MM/YYYY")
        })}}/>
         
      </DemoContainer>
    </LocalizationProvider>

    
    
    
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Education</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your Education" value={inputData.education}
                   onChange={e=>{setinputData({...inputData,education:e.target.value})}}
                    />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Location</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your location" value={inputData.location}
                   onChange={e=>{setinputData({...inputData,location:e.target.value})}}
                   />
                   </div>
                  </div>
                </div>
     
                <div className="col-md-12 mt-3">
                <div className="row">
                  <div className="col-2">
                     <label htmlFor="" className="text-center"> About:</label>
                   </div>
                   <div className="col-10">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your details" value={inputData.about}
                   maxRows={7} minRows={7} multiline  onChange={e=>{setinputData({...inputData,about:e.target.value})}} />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-8">
                            <Button type="submit" className="btn btnsubmit" >Submit</Button>
                        </div>
                    </div>
                </div>

                </div>

            </form>
        </div>
   </>
  )
}

export default Edit