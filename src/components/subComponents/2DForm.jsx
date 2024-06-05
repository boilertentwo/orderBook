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

export function _2DCutForm({ image, index, type }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [lengthUnit, setLengthUnit] = useState('mm');
  const [breadthUnit, setBreadthUnit] = useState('mm');
  const [borderUnit, setBorderUnit] = useState('mm');
  const [formStatus, setFormStatus] = useState(null);
  const { scrollToGallery,setImageCall,singleImage,setSingleImage,setEmpForm, setSubmitStatus, setGalleryLink } = useAppContext();
  const {userId} = useAuth()

  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);
  
  const database2d = new Databases(client);
  const modelRef = useRef();
  
  const onSubmit = async (data) => {
    const lengthInMM = convertUnit(parseFloat(data.length), data.lengthUnit, 'mm');
    const breadthInMM = convertUnit(parseFloat(data.breadth), data.breadthUnit, 'mm');
    const borderInMM = convertUnit(parseFloat(data.border), data.borderUnit, 'mm');
    const thicknessInMM = parseInt(data.thickness);

    try {
      await database2d.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASEID, 
        import.meta.env.VITE_APPWRITE_2DCOLLECTION, 
        ID.unique(), 
        {
          length: lengthInMM,
          breadth: breadthInMM,
          border: borderInMM,
          thickness: thicknessInMM,
          model: image,
          'with-material': data.material,
          userID : userId,
        }
      );

      setFormStatus('submitted');
      reset(); 
      if(type==='emptyForm'){setEmpForm(false)}
      setSubmitStatus({ type, status: 'submitted', index }); 
      setSingleImage('')

    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleCancel = () => {
    if(type==='emptyForm'){setEmpForm(false)}
    setSubmitStatus({ type, status: 'cancelled', index });
    setFormStatus('cancelled');
    reset(); 
    setSingleImage('')
  };
  const getSingleImage=()=>{
        setImageCall(true)
        setGalleryLink('/2dcuttings')
        scrollToGallery();
  }
  

  return (
    <form className='p-3 border-2 border-blue-900 rounded-md italic' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between m-2">
        <div ref={modelRef} className="m-2 min-h-16 w-1/2">
          {image?<img src={`${import.meta.env.VITE_IMAGE_URL}${image}`} alt="" />:singleImage?<img src={`${import.meta.env.VITE_IMAGE_URL}${singleImage}`} alt="" />:<div onClick={getSingleImage} className='relative self-center size-full content-center border-2 border-white'>
      <p onClick={getSingleImage} className='absolute inset-0 flex items-center justify-center text-white'>Click for image</p>
    </div>}
        </div>
        <div className="w-1/2 flex flex-col justify-around">
          <div>
            <label>Height:</label><br/>
            <input className='w-24' type="number" {...register('length', { required: true })} />
            <select {...register('lengthUnit')} className='bg-blue-500' defaultValue={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.length && <p className="text-red-500">Length is required</p>}
          </div>
          <div>
            <label>Width:</label><br/>
            <input className='w-24' type="number" {...register('breadth', { required: true })} />
            <select {...register('breadthUnit')} className='bg-blue-500' defaultValue={breadthUnit} onChange={(e) => setBreadthUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.breadth && <p className="text-red-500">Breadth is required</p>}
          </div>
          <div>
            <label>Border:</label><br/>
            <input className='w-24' type="number" {...register('border', { required: true })} />
            <select {...register('borderUnit')} className='bg-blue-500' defaultValue={borderUnit} onChange={(e) => setBorderUnit(e.target.value)}>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {errors.border && <p className="text-red-500">Border is required</p>}
          </div><br/>
          <div>
            <label htmlFor="">Thickness:</label>
            <select className='bg-blue-500' {...register('thickness', { required: true })}>
              <option value="6">6mm</option>
              <option value="12">12mm</option>
              <option value="16">16mm</option>
              <option value="18">18mm</option>
              <option value="25">25mm</option>
              <option value="30">30mm</option>
            </select>
            {errors.thickness && <p className="text-red-500">Thickness is required</p>}
          </div><br/>
          <div>
            <label>with Material</label>
            <input 
              type="checkbox" 
              {...register('material')} 
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row m-2">
        <div className="w-1/2 text-center cursor-pointer m-1" onClick={handleCancel}><strong>Cancel</strong></div>
        {type==='emptyForm'?<div className="w-1/2 text-center m-1"><strong><button >Upload Image</button></strong></div>:<div className="w-1/2 text-center m-1"><strong><button type="submit">Submit</button></strong></div>}
      </div>
    </form>
  );
}
