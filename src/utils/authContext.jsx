import {useContext,createContext,useEffect,useState} from 'react'
import { account } from '../appwrite.config'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/subComponents/Loader'
import { ID } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userId , setUserId] = useState('')
    const navigate = useNavigate();
    
    useEffect(()=>{
        checkUserStatus()
    },[])

    const session = async(userInfo)=>{
        setLoading(true)
        try {
            await account.createSession(
                userId,
                userInfo.secret
            )
            setUser(await account.get())
        } catch (error) {
            console.log('error occured:',error)
        }
        setLoading(false)
    }

    const loginUser = async (userInfo)=>{
        setLoading(true)
        try {
            const response = await account.createPhoneToken(
                ID.unique(),
                userInfo.mobileNo
            )
            setUserId(response.userId)
            navigate('/register')
        } catch (error) {
            console.log(error)
        }
        
        setLoading(false)
    }

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
        setUserId('')
    }

    const registerUser = async (userInfo)=>{
      
    }

    const checkUserStatus = async () => {
            try {
                const accountDeps = await account.get()
                setUser(accountDeps)
            } catch (error) {
                navigate('/login')
            }
            setLoading(false)
    }

    const contextData = {
        user,
        userId,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus,
        session
    }

    return (
        <AuthContext.Provider value={contextData}>
                {loading?<Loader></Loader>:children}
        </AuthContext.Provider>
    )

}
export const useAuth = ()=>{
    return useContext(AuthContext)
}