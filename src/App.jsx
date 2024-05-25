import { useRef, useState, useEffect } from 'react';
import Linker from './components/mainComponents/Linker';
import { Gallery } from './components/mainComponents/Gallery';
import { AppContextProvider, useAppContext } from './Context/context';



function App() {
  const homeRef = useRef();

  const galleryRef = useRef();
  const quotationRef = useRef();
  const paymentRef = useRef();
  const [galleryLink, setGalleryLink] = useState('')
  const [formLinks, setFormLinks] = useState([]);
  const [sumbitImages , setSubmitImages] = useState(false)
  

  
  
  


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
    <AppContextProvider value={{scrollToGallery, scrollToQuotation, scrollToPayment,formLinks,sumbitImages, setSubmitImages, galleryLink ,setGalleryLink}}>
            <div>
      <div className="h-12 min-w-full top-0 rounded text-center text-bold">LOGO</div>
      <div className="h-screen w-auto flex flex-row overflow-x-auto scroll-smooth snap-x snap-mandatory  mx-2 p-1 mb-16">
        <div ref={homeRef} className="min-h-full min-w-full  mx-1 snap-center snap-always overflow-y-auto scroll-smooth">
          <Linker></Linker>
        </div>
        <div ref={galleryRef} className="min-h-full min-w-full static overflow-y-auto mx-1 snap-center snap-always">
          <Gallery></Gallery>
        </div>
        <div
          ref={quotationRef}
          className="min-h-full min-w-full mx-1 snap-center snap-always bg-contain bg-center"
          > 
          {/* <img src="static/images/png.png" alt="5rrr" /> */}
        </div>
        <div ref={paymentRef} className="min-h-full min-w-full mx-1 snap-center snap-always"></div>
      </div>
      <div className="h-16 min-w-full fixed bottom-0  rounded-t-lg flex flex-row justify-around">
        <button onClick={scrollToHome}>Home</button>
        <button onClick={scrollToGallery}>Gallery</button>
        <button onClick={scrollToQuotation}>Quotation</button>
        <button onClick={scrollToPayment}>Payment</button>
      </div>
    </div>
    </AppContextProvider>
    
  );
}

export default App;
