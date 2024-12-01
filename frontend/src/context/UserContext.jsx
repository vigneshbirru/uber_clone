import React from 'react'

export const UserDataContext = createContext();
const UserContext = ({ children }) => {

    const [user,setUser] = useState({
        email: '',
        Fullname:{
            firstname: '',
            lastname: ''
        }
    })

    return (
        <div>
            <UserDataContext value={[user,setUser,Fullname]}> 
                {children}
            </UserDataContext>
        </div>
    )
}
export default UserContext