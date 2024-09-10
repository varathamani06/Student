
import './Studtable.css';
import { Paper,TableContainer,Table,TableHead,TableBody,TableCell,TableRow,Dialog,DialogTitle,DialogContent, Button } from '@mui/material';


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import Trash from './Image/trash.png';

function Studtable() {
    const [data,setdata]=useState([])
    const column=[
        {id:"id",name:"id"},
        {id:"firstname",name:"fname"},
        {id:"lastname",name:"lname"},
        {id:"location",name:"location"},
        {id:"email",name:"email"},
        {id:"date",name:"date"},
        {id:"education",name:"education"},
        {id:"action",name:"Action"},
        {id:"delete",name:"Delete"}
    ];
    // const [show,setshow]=useState(false);
    const [open,openchange]=useState(false);
    const[del,setdel]=useState();

    // const handletrash=()=>{
    //     setshow(true);
    // }
    const onclosepop=()=>{
        openchange(false);

    }
    const openpop=()=>{

     openchange(true);
    
    }
    const handelcancel=()=>{
        openchange(false);
    }
    const handlecanceldelete=()=>{
        console.log("okay");
        openchange(false);
        console.log(del);
        axios.delete("http://localhost:8088/delete/"+del).then((res)=>{
            console.log("deleted sucessfullt");
            
        })
        
    }
    const handledelete2=(id)=>{
     console.log(id);
     openpop();
     setdel(id);
    }
  

    useEffect(()=>{
        axios.get("http://localhost:8088/").then((res)=>{setdata(res.data)}).catch(
            (err)=>{console.log(err.message);
            }
        )
    })
    
     
  return (
    <>
    <div className="container mt-3">
        <div>
            <h2>Student Management System</h2>
        </div>
        <Paper sx={{margin:"1%"}}>
            <div style={{margin:"1%"}}>
               <Link className="btn btn-dark addbtn" to="/create">ADD </Link>
            </div>
            <TableContainer>
                <Table>

                <TableHead>  
                <TableRow >
                    {
                      column.map((column)=>(
                        <TableCell key={column.id} >{column.name}</TableCell>
                      ))
                    
                    }
                    <TableCell></TableCell>
                 </TableRow>
                       </TableHead>

                <TableBody>
                {
                    data.map((data,i)=>(
                        <TableRow key={i}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.firstname}</TableCell>
                            <TableCell>{data.lastname}</TableCell>
                            <TableCell>{data.location}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.education}</TableCell>
                            <TableCell> <Link to={`/edit/${data.id}`}> <EditIcon className="icon pen"/> </Link> </TableCell>
                            <TableCell><Button onClick={e=>handledelete2(data.id)}> <DeleteIcon className="icon"/> </Button></TableCell>
                        </TableRow>
                    ))
                }
 
                </TableBody>

                </Table>
            </TableContainer>

        </Paper>
        <Dialog open={open} onClose={onclosepop} fullWidth maxWidth="sm">
            <DialogTitle>
              <div className='trashcenter my-2'>
               <img src={Trash} alt="" className='trashimage'/>
              </div>
              <div className='center mt-3'>
                <h2>Are you sure you want to Delete</h2>
              </div>
                
            </DialogTitle>
            <DialogContent>
                <div className="center">
                    <Button onClick={handelcancel} className='btncancel'>cancel</Button>
                    <Button onClick={handlecanceldelete} className='btnokay'> yes</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
    </>
  )
}

export default Studtable