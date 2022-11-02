import '../Modal.css';
import {useNavigate} from "react-router-dom"




const Modal = ({ setShowModal, show,setCart,children,cart,setCost }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate=useNavigate();
    
    const handleClick=()=>{
        alert('User checked out')
        navigate('/home')
        setCart([])
        setCost(0.0)
        setShowModal(false)
    }
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
       {children}
        <button class="ui button" onClick={()=>{setShowModal(false)}}>
          Close
        </button>
        {cart.length>0 && 
        <button onClick={()=>{handleClick()}} class='ui button' >Proceed to Checkout</button>}
      </section>
    </div>
  );
};
export default Modal