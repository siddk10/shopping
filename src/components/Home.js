import axios from 'axios'
import { useEffect,useState } from 'react'

import Modal from './Modal'

const Home=()=>{
    
    const[data,setData]=useState([])
    const[user,setUser]=useState("")
    const[query,setQuery]=useState("")
    const[showModal,setShowModal]=useState(false)
    const[cart,setCart]=useState([])
    const[cost,setCost]=useState(0.0)
    
    
    //For getting products
    const getProducts=async()=>{
        const res=await axios.get("https://fakestoreapi.com/products")
        
        setData(res.data)

    }

    useEffect(()=>{
        getProducts();
        setUser(localStorage.getItem("username"))
    },[])
    //For Logout
    const handleLogout=(e)=>{
        
        e.preventDefault();
       
        localStorage.removeItem('token');
        window.location.reload();
               
    }
    //For Searching data
    const searchData=data.filter((item) => {
    if(item.title.toLowerCase().includes(query.toLowerCase()))
    {
        return item
    }}
    )
    //For Adding products to cart
    const addToCart=(item,index)=>{
        
        let existingItem = cart.find(item => item.id === index+1);
        if(existingItem){
            alert('Already Added')
        }
        else
        {   
            
            let tc=cost+parseFloat(item.price)
            setCost(tc)
            setCart([...cart,item])
            alert('Addded Successfully')
        }
        
    }
   //For removing products from cart
    const removeFromCart=(item,id)=>{
        
        setCart((item) => cart.filter(item => item.id !== id));
        if(cart.length==0)
        {
       
        setCost(0.0)
        }
        else{
            
            setCost(cost-parseFloat(item.price))
        
        }
        
    }
   
    
  

    return(
        <div>
         
              {/* shows nav bar */}
        
        <div class="ui  menu">
                <div class="active item">
                  Home
                </div>
                <div class="right menu">
                    <div class="item">
                        <div >
                          <i class="user icon"/>
                              {user}
                        </div>
                      </div>
                <div class="item">
                    <div>

                        <a><i onClick={()=>{setShowModal(true)}} class="shopping bag icon"/></a>
                    </div>
                </div>
                  <div class="item">
                    <div class="ui icon input">
                      <input type="text" onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search..."/>
                      <i onClick={()=>{searchData()}} class="search link icon"></i>
                    </div>
                  </div>
                  <p onClick={(e)=>{handleLogout(e)}} class="ui item">
                    Logout
                  </p>
                </div>
        </div>
  
        {/* shows all products */}
        
        <div class="ui grid container">
           
                
           {searchData && searchData.map((data,index)=>{
            return(
             
               
                <div key={data.id} class="four wide column">
                <div class="ui fluid card">
                  <div class="ui tiny image">
                    <img src={`${data.image}`}/>
                  </div>
                  <div class="content">
                    <div class="header">{data.title}</div>
                    <div class="meta">
                      <p>{data.category}</p>
                    </div>
                    <div class="description">
                        {data.description}
                    </div>
                  </div>
                  <div class="extra content">
                    <span class="right floated">
                    <i class="rupee sign icon"></i>
                      {data.price}
                      <br/>
                      <i class="shopping cart icon"></i>
                       <button onClick={()=>{addToCart(data,index)}} >Add</button>
                        </span>
                    <span>
                    <i class="comments icon"></i>
                      {data.rating.count} 
                      <br/>
                      <i class="heart icon"></i>
                      {data.rating.rate}
                    </span>
                  </div>
                </div>
                </div>
                
      
                  
            )
           })}
        </div>
        {/* shows all cart products */}
        <Modal class="ui grid container" setCost={setCost} cart={cart} setShowModal={setShowModal} setCart={setCart} show={showModal} >
            <br/>
            <div>Total Cost:{cost.toFixed(2)}</div>
            {cart && cart.map((data)=>{
                return(
                
                        <div key={data.id} class="ui card">
                          <div class="card">
                            <div class="image">
                              <img class="ui tiny image" src={`${data.image}`}/>
                            </div>
                            <div class="content">
                              <div class="header">{data.title}</div>
                              <div class="meta">
                                <a>{data.category}</a>
                              </div>
                              
                            </div>
                            <div class="extra content">
                              <span class="right floated">
                                <i class="rupee sign icon"></i>
                                     { data.price}
                                     <button onClick={()=>{removeFromCart(data,data.id)}} class="ui button" >Remove </button>
                   
                                        <br/>
                              </span>
                              
                            </div>
                          </div>
                        </div>
                   
                )
            })}
        </Modal>
        </div>
    )
}
export default Home