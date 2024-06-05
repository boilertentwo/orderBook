import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/context";
import PropTypes from "prop-types";
import axios from "axios";

function HomeLinker({ thumbLink, thumbName }) {
  const [imagesPath, setImagesPath] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { setGalleryLink, scrollToGallery } = useAppContext();

  useEffect(() => {
    const fetchingImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_IMAGE_URL}${thumbLink}`);
        setImagesPath(response.data.images || []); // Ensure imagesPath is an array
      } catch (error) {
        console.log('Error while fetching images from server', error);
        setImagesPath([]); // Fallback to an empty array on error
      } finally {
        setLoading(false); 
      }
    };
    fetchingImages();
  }, [thumbLink]);

  return (
    <div className="min-w-full h-48 my-1 p-0 rounded-tr-lg flex flex-col justify-around">
      <div className="min-w-full h-auto flex flex-row justify-between items-center">
        <h2 className="m-2 text-xl font-sans font-bold">{thumbName}</h2>
        <div 
          onClick={() => {
            setGalleryLink(thumbLink);
            scrollToGallery();
          }} 
          className="cursor-pointer min-w-24 h-10 content-center"
        >
          <p className="text-center">more</p>
        </div>
      </div>
      {loading ? (
        <div className="h-36 min-w-full flex justify-center items-center">
          <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <div 
          onClick={() => {
            setGalleryLink(thumbLink);
            scrollToGallery();
          }} 
          className="h-36 min-w-full flex flex-row overflow-x-auto scroll-mx-px snap-x snap-mandatory"
        >
          {imagesPath.slice(0, 7).map((path, index) => (
            <div 
              key={index} 
              className="min-h-24 min-w-24 bg-cover bg-center bg-slate-900 mx-1 rounded-lg snap-start snap-always"
              style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL}${path})` }}
            >
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

HomeLinker.propTypes = {
  thumbLink: PropTypes.string.isRequired,
  thumbName: PropTypes.string.isRequired,
};

export default HomeLinker;


