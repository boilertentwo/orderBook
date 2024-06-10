import { useState, useRef } from 'react';
import { Client, Databases, ID } from 'appwrite';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../Context/context';
import { useAuth } from '../../utils/authContext';


const unitConversion = {
    mm: 1,
    cm: 10,
    in: 25.4,
  };
  
  function convertUnit(value, fromUnit, toUnit) {
    return (value * unitConversion[fromUnit]) / unitConversion[toUnit];
  }

export function MainDoor({image,index,type}){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [lengthUnit, setLengthUnit] = useState('mm');
    const [breadthUnit, setBreadthUnit] = useState('mm');
    const [borderUnit, setBorderUnit] = useState('mm');
    const [formStatus, setFormStatus] = useState(null); 
    const { setSingleImage,scrollToGallery,setImageCall,singleImage,setEmpForm, setSubmitStatus, setGalleryLink } = useAppContext();
    const {userId} = useAuth()
    const [dbImage, setDbImage] = useState('')

    const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

    const databaseMD = new Databases(client);
    const modelRef = useRef();

    const onSubmit = async (data) => {
        const lengthInMM = convertUnit(parseFloat(data.length), data.lengthUnit, 'mm');
        const breadthInMM = convertUnit(parseFloat(data.breadth), data.breadthUnit, 'mm');
        const borderInMM = convertUnit(parseFloat(data.border), data.borderUnit, 'mm');
        const finishinMM = parseInt(data.finishing)
        if(image==='')
          {
            setDbImage(singleImage)
          }
        else{
          setDbImage(image)
        }


        try {
          await databaseMD.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASEID, 
            import.meta.env.VITE_APPWRITE_MAINDOORCOLLECTION, 
            ID.unique(), 
            {
              length: lengthInMM,
              breadth: breadthInMM,
              border: borderInMM,
              model: dbImage,
              'hand-finish': data.handfinish,
              finishing: finishinMM,
              userID : userId,
            }
          );
          setFormStatus('submitted');
          reset(); 
          setSingleImage('')
          setSubmitStatus({ type, status: 'submitted', index }); 
        } catch (error) {
          console.error('Error creating document:', error);
        }
      };
    
      const handleCancel = () => {
        setSubmitStatus({ type, status: 'cancelled', index });
        
        setFormStatus('cancelled');
        reset();
        setSingleImage('')
      };

      const getSingleImage=()=>{
        setImageCall(true)
        setGalleryLink('/maindoors')
        scrollToGallery();
  }
  
    
    return(
        <form className='p-3 border-2 border-blue-950 rounded-md italic' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between m-2">
        <div ref={modelRef} className="m-2 w-1/2 m-h-16">
        {image?<img src={`${import.meta.env.VITE_IMAGE_URL}${image}`} alt="" />:singleImage?<img src={`${import.meta.env.VITE_IMAGE_URL}${singleImage}`} alt="" />:<div onClick={getSingleImage} className='relative self-center size-full content-center border-2 border-white'>   <p onClick={getSingleImage} className='absolute inset-0 flex items-center justify-center text-white'>Click for image</p>
    </div>}
        </div>
        <div className="w-1/2 flex flex-col justify-around">
          <div>
            <label>Height:</label><br/>
            <input className='w-24' type="number" {...register('length', { required: true })} />
            <select {...register('lengthUnit')} defaultValue={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.length && <p className="text-red-500">Length is required</p>}
          </div>
          <div>
            <label>Width:</label><br/>
            <input className='w-24' type="number" {...register('breadth', { required: true })} />
            <select {...register('breadthUnit')} defaultValue={breadthUnit} onChange={(e) => setBreadthUnit(e.target.value)}>
               <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.breadth && <p className="text-red-500">Breadth is required</p>}
          </div>
          <div>
            <label>Border:</label><br/>
            <input className='w-24' type="number" {...register('border', { required: true })} />
            <select {...register('borderUnit')} defaultValue={borderUnit} onChange={(e) => setBorderUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.border && <p className="text-red-500">Border is required</p>}
          </div>
          <div><br/>
            <label htmlFor="">Finishing:</label>
            <select {...register('finishing', { required: true })}>
              <option value="3">3mm</option>
              <option value="4">4mm</option>
              <option value="5">5mm</option>
              <option value="6">6mm</option>
              <option value="8">8mm</option>
              <option value="10">10mm</option>
            </select>
            {errors.finishing && <p className="text-red-500">Finish is required</p>}
          </div><br/>
          <div>
            <label>Hand-Finish</label>
            <input 
              type="checkbox" 
              {...register('handfinish')} 
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row m-2">
        <div className="w-1/2 text-center cursor-pointer m-1" onClick={handleCancel}><strong>Cancel</strong></div>
        <div className="w-1/2 text-center m-1"><strong><button type="submit">Submit</button></strong></div>
      </div>
    </form>
  );
}
