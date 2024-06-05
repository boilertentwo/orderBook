import {useState , useEffect} from 'react'
import { useAuth } from '../../utils/authContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function Register(){
    const {session,user} = useAuth()
    const {register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onSubmit = (data)=>{
        session(data)
    }

    return(    
        <>
            <div className='h-screen w-full flex flex-row justify-center items-center bg-gradient-to-r from-blue-950 to-blue-300'>
                <form onSubmit={handleSubmit(onSubmit)} className='h-96 w-64 flex flex-col justify-around p-2'>
                    <div>
                        <label htmlFor="otp">Enter OTP:</label>
                        <input type="text" minLength={6} maxLength={6} {...register('secret',{required:'OTP is must!'})} />
                        {errors.secret&&<p className='text-red'>Please enter the OTP</p>}
                        <button type='submit'>Login</button>
                    </div>

                </form>
            </div>
                    
        </>
    )
}