import { useNavigate } from "react-router-dom";

export const TopBar = () => {
    const navigate = useNavigate()
      const handleForm = () => {
          navigate('/')
      }
      return(
        <div className="top-bar">
            <div className="logo" onClick={handleForm}>SHISHAMEMO</div>
            <div className="menu">
            <a href="/shop">Shop</a>
            <a href="/profile">Profile</a>
            </div>
        </div>
      )
}