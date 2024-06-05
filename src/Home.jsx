import { useRef, useState, useEffect } from 'react';
import Linker from './components/mainComponents/Linker';
import { Gallery } from './components/mainComponents/Gallery';
import { Form } from './components/mainComponents/Form'
import { AppContextProvider, useAppContext } from './Context/context';
import { useAuth } from './utils/authContext';
import GeolocationComponent from './components/mainComponents/Map';


function Home() {
  const homeRef = useRef();

  const galleryRef = useRef();
  const quotationRef = useRef();
  const paymentRef = useRef();
  const logoRef = useRef();
  const [galleryLink, setGalleryLink] = useState('')
  const [formLinks, setFormLinks] = useState([]);
  const [submitImages , setSubmitImages] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({})
  const [empForm,setEmpForm] = useState(false)
  const [singleImage , setSingleImage] = useState('')
  const [imageCall , setImageCall]=useState(false)
  const {logoutUser} = useAuth()


  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };
  const scrollToGallery = () => {
    galleryRef.current.scrollIntoView({ behavior: 'smooth' });
 
  };
  const scrollToQuotation = () => {
    quotationRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };
  const scrollToPayment = () => {
    paymentRef.current.scrollIntoView({ behavior: 'smooth' });
    
  };

  return (
    <AppContextProvider value={{imageCall,setImageCall,singleImage,setSingleImage,empForm,setEmpForm,submitStatus,setSubmitStatus,scrollToGallery, scrollToQuotation, scrollToPayment,formLinks,submitImages, setSubmitImages, galleryLink ,setGalleryLink}}>
    <div className='bg-gradient-to-r from-blue-950 to-blue-300 font-sans text-lg  font-bold'>
      <div className="h-24 min-w-full static top-0 rounded text-center flex flex-row justify-center p-3 ">
                     
            <h1 className='italic overline content-center font-serif text-3xl font-black'>.orderBook</h1>
           
           
      </div>
      <div className="h-screen w-auto flex flex-row overflow-x-auto scroll-smooth snap-x snap-mandatory mx-2 p-1 mb-16">
        <div ref={homeRef} className="min-h-full min-w-full mx-1 snap-center snap-always overflow-y-auto scroll-smooth">
          <Linker></Linker>
        </div>
        <div ref={galleryRef} className="min-h-full min-w-full static overflow-y-auto mx-1 snap-center snap-always">
          <Gallery></Gallery>
        </div>
        <div
          ref={quotationRef}
          className="min-h-full min-w-full mx-1 overflow-y-auto scroll-smooth snap-center snap-always "
          > 
          <Form></Form>
      
        </div>
        <div ref={paymentRef} className="min-h-full min-w-full mx-1 snap-center snap-always flex flex-col justify-end items-center">
                 {/* <GeolocationComponent></GeolocationComponent> */}
                 <div className='w-full h-16 text-center content-center bg-red-700 text-2xl text-black' onClick={logoutUser}> logout</div>
        </div>
      </div>
      <div className="h-16 min-w-full fixed bottom-0 bg-gradient-to-r from-blue-950 to-blue-300 flex flex-row justify-around">
        <button  onClick={scrollToHome}>Home</button>
        <button  onClick={scrollToGallery}>Gallery</button>
        <button  onClick={scrollToQuotation}>Quotation</button>
        <button  onClick={scrollToPayment}>Payment</button>
      </div>
    </div>
    </AppContextProvider>
    
  );
}

export default Home;
