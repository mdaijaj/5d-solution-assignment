import { useEffect, useState } from 'react';
import '../App.css'
import Loader from './loader'
import axios from 'axios';


const MomentsList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [momentdata, setMomentdata]=useState([])
    const [filter, setFilter] = useState('');  //search query


    const allUserList = async () => {
      const response = await axios.get('/api/supportTicketList');
      let filterData = await response.data.data
      setMomentdata(filterData)
    }


    const sortingFun= (data)=>{
    const sortedTickets = momentdata.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
       setMomentdata(sortedTickets)
    }


    const newSorting=(sortType)=> {
        if (sortType === "ascending") {
            momentdata.sort((a, b) => a.severity_level < b.severity_level ? -1 : 1)  
        }
        else if (sortType === "descending") {
            momentdata.sort((a, b) => b.severity_level > a.severity_level? 1 : -1)
        }
        return momentdata;
      }
      
    //   console.log("searchQuery", searchQuery)

    const setSearchQuery=(data)=>{
        const filteredTickets = momentdata.filter(ticket =>
            ticket.topic.toLowerCase().includes(data.toLowerCase())  ||
            ticket.ticket_type.toLowerCase().includes(data.toLowerCase())
        )
        setMomentdata(filteredTickets)
    }



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        allUserList()
    }, [])

    const margin = {
        marginLeft: "200px"
      };

    return (
        <>
            <div class="main_div" style={{width: "100%"}}>
                <div>
                    {isLoading ? <Loader /> : <h2>Support Agent Ticket List</h2>}
                </div>
                <div className='main' style={{backgroundColor: "gray", height: "50px", }}>
                <form>

                    <span style={margin}>Search</span>
                    <input
                        type="text"
                        placeholder="Search ...."
                        // value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <span style={margin}>Sort By</span>
                    <select defaultValue={'title'} onChange={(e)=> sortingFun(e.target.value)} >
                    <option value="date" disabled>None</option>
                    <option value="createdAt">createdAt</option>
                    <option value="resolvedOn">resolvedOn</option>
                    <option value="severity_level">severity_level</option>
                    <option value="topic">topic</option>
                    </select>


                    {/* sorting accending and decending */}
                    <span style={margin}>Sort By</span>
                    <select defaultValue={'DEFAULT'} onChange={(e) => newSorting(e.target.value)}>
                    <option value="DEFAULT" disabled>None</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                    </select>
                </form>
                </div>
                <div class="row">
                    {momentdata?.map((menu, index) => (
                        <div class="col-4">
                            <div class="card">
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