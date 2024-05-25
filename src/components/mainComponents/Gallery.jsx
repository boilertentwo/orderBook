import React, { useState, useEffect, useRef,useCallback} from 'react';
import { useAppContext } from '../../Context/context';
import axios from 'axios';

export function Gallery() {
  const { galleryLink, scrollToGallery} = useAppContext();
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false)
  const [bufferImg ,setBufferImg] = useState([]);


  useEffect(() => {
    const fetchingImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api${galleryLink}`);
        setGalleryImages(response.data.images);
      } catch (error) {
        setError('Error while fetching images from server');
      } finally {
        setIsLoading(false);
        scrollToGallery();
      }
    };

    if (galleryLink) {
      fetchingImages();
    }
  }, [galleryLink, scrollToGallery]);


  return (
    <>
      {isVisible && (
        <div  className="fixed bottom-4 right-4 z-50 cursor-pointer">
          <div className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors">
            Up
          </div>
        </div>
      )}

      <div className="">
        <input
         
          onChange={(e) => console.log(e.target.value)}
          type="text"
          id="gallery"
          placeholder="search for models"
          className="min-w-full p-1 border-2 border-slate-500"
        />
      </div>
      
      

      {isLoading ? (
        <div className="self-center size-full content-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : error ? (
        <div className="self-center size-full content-center">
          <h1 className="text-center">{error}</h1>
        </div>
      ) : galleryImages.length > 0 ? (
        <div>
          {galleryImages.map((image, index) => (
            <div key={index} onClick={()=>{
            setBufferImg((prev)=>[...prev,`${image}`])
            console.log(bufferImg)
            }}>
               <img key={index} src={`/api${image}`} alt={`Image ${index + 1}`} />
            </div>
           
          ))}
        </div>
      ) : (
        <div className="self-center size-full content-center">
          <h1 className="text-center">Choose a route</h1>
        </div>
      )}

     
     
      {/* {
        bufferImg? bufferImg.map((eachImg,index)=>{
          <div className=''>

          </div>
        }

        ) : null
      } */}

    </>
  );
}
