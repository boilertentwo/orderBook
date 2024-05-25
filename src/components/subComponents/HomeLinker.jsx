import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/context";
import PropTypes from "prop-types";
import axios from "axios";  

function HomeLinker(props) {
  const [imagesPath, setImagesPath] = useState([]);
  const {server_string, setGalleryLink, scrollToGallery } = useAppContext();

  useEffect(() => {
    const fetchingImages = async () => {
      try {
        const response = await axios.get(`/api${props.thumbLink}`);
        setImagesPath(response.data.images);
      } catch (error) {
        console.log('Error while fetching images from server', error);
      }
    };
    fetchingImages();
  }, [props.thumbLink]);

  return (
    <div 
    onClick={() =>{
      setGalleryLink(props.thumbLink)
      scrollToGallery()
    }
    } 
    className="min-w-full h-48 my-1 p-0 rounded-tr-lg flex flex-col justify-around">
      <div className="min-w-full sticky h-auto flex justify-between">
        <h2 className="m-2">{props.thumbName}</h2>
        <div className="rounded-tr-lg min-w-24 h-10">
          <p className="text-center">more</p>
        </div>
      </div>
      <div className="h-36 b-2 min-w-full flex flex-row overflow-x-auto scroll-mx-px snap-x snap-mandatory">
        {imagesPath.slice(0, 7).map((path, index) => (
          <div 
            key={index} 
            className="min-h-24 min-w-24 bg-cover bg-center bg-slate-900 mx-1 rounded-lg snap-start snap-always"
            style={{ backgroundImage: `url(/api${path})` }}>
          </div>
        ))}
      </div>
    </div>
  );
}

HomeLinker.propTypes = {
  thumbLink: PropTypes.string.isRequired,
  thumbName: PropTypes.string.isRequired,
};

export default HomeLinker;
