import React,{useState} from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './index.css';

function Form(){
    const[input, setInput]=useState({
        itemcode:'',
        name1:'',
        name2:'',
        price:'',
        vendorname:'',
        date:''
    })


    const [taskarray,settaskarray]=useState([])

    const columns = [
        { field: 'itemcode', headerName: 'Item Code', width: 210 },
        { field: 'name1', headerName: 'Name one', width: 210 },
        { field: 'name2', headerName: 'Name two', width: 210 },
        { field: 'price', headerName: 'Price', width: 210 },
        { field: 'vendorname', headerName: 'Vendor Name', width: 210 },
        { field: 'date', headerName: 'Date', width: 210 }]

    function handleChange(event){
        const{name,value} = event.target;
        setInput(prevInput =>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }

    function handleClick(event){
        event.preventDefault();
        console.log(input);
        axios.post('http://localhost:3001/user', input)
        .then(response => {
            axios.get('http://localhost:3001/user')
            .then(res => settaskarray(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    return(
<>
<div>
<h2 class="upper" style={{fontStyle:"Bold",textAlign:"center", color: "#102952",fontSize:"43px",fontFamily:"Merriweather"}} >Active Buidings</h2>
<h3 style={{fontFamily:"Courgette",textAlign:"center"}} > Online Inventory Cart Management System</h3>

<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5 )",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px",fontStyle:"bold"}}>Item Code</span>
<input type="text" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="itemcode" value={input.itemcode} style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}} />
</div>
<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{  backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px"}}>Name one</span>
<input type="text" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="name1" value={input.name1}  style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}}/>
</div>
<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{  backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px"}}>Name Two</span>
<input type="text" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="name2" value={input.name2}   style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}}/>
</div>
<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{  backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px"}}>Price</span>
<input type="number" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="price" value={input.price}  style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}}/>
</div>
<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{  backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px"}}>Vendor Name</span>
<input type="text" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="vendorname" width="" value={input.vendorname}  style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}}/>
</div>
<div class="input-group mb-3">
<span class="input-group-text" id="inputGroup-sizing-default" style={{  backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)",fontFamily:"Merriweather",textAlign:"center",fontSize:"25px"}}>Date</span>
<input type="date" onChange={handleChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="date" value={input.date}  style={{backgroundImage: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",fontFamily:"Merriweather"}}/>
</div>
<br></br>
<div>
    <button type="button" name="button" onClick={handleClick} style={{display:"block",width:"200px", fontSize:"30px",borderRadius:"30px" ,fontFamily:"Merriweather",margin:"auto",backgroundImage: "linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5 )" }}>Submit</button>
    </div>
    <br></br><br></br>
    <h1 style={{textAlign:"center"}}>The list of items added to cart</h1>
    <div style={{ display: 'flex', height: '100%' }}>
  <div style={{ flexGrow: 1}}>
    <DataGrid className="table" autoHeight style={{backgroundImage: "linear-gradient(302deg, rgba(0,0,0,1) 0%, rgba(203,247,243,0.9322916666666666) 0%, rgba(216,242,211,1) 99%)",textAlign:"center",fontFamily: 'Josefin Sans',fontSize:"27px"}}
        getRowId={(row) => row._id}
        rows={taskarray}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        columnBuffer={6}
        
      />
      </div></div></div>
      <br></br><br></br>
      <h5 style={{textAlign:"center"}}>Made by Khushi</h5>
      <br></br>
</>

    );
};


export default Form;