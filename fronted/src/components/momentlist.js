import { useEffect, useState } from 'react';
import '../App.css'
import Loader from './loader'
import axios from 'axios';


const MomentsList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [momentdata, setMomentdata]=useState([])


    const allUserList = async () => {
      const response = await axios.get('/api/supportTicketList');
      let filterData = await response.data.data
      setMomentdata(filterData)
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        allUserList()
    }, [])


    return (
        <>
            <div class="container" style={{width: "100%"}}>
                <div>
                    {isLoading ? <Loader /> : <h2>Support Agent Ticket List</h2>}
                </div>
                <div class="row">
                    {momentdata?.map((menu, index) => (
                        <div class="col-4">
                            <div class="card">
                            {console.log("menu", menu)}
                                <img class="card-img-top img-fluid" src={`https://images.unsplash.com/photo-1537203271513-17c9f9dd3274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MzA2Njc0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080` } 
                                    style={{ height: "200px", width: "250px", margin: "auto", borderRadius: "10px", marginTop: "20px" }} alt="Card image cap" />
                                <div class="card-block">
                                    <h3 class="card-text">{`${menu.topic}`}</h3>
                                    <p class="card-text">{`Severity Level : ${menu.severity_level}`}</p>
                                    <p class="card-text">{`Ticket Type : ${menu.ticket_type}`}</p>
                                    <p class="card-text">{`Ticket Create : ${menu.createdAt}`}</p>
                                    <p class="card-text">{`AssingedTo : ${menu.assignedTo}`}</p>
                                    <p class="card-text">{`ResolvedOn : ${menu.resolvedOn}`}</p>
                                    <p class="card-text">{`Description : ${menu.description}`}</p>
                                    <p class="card-text">{`Status : ${menu.status}`}</p>
                                    <a href="#" class="btn btn-primary">Ticket Assign</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default MomentsList;