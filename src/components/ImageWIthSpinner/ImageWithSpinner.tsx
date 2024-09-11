import { useState } from "react";

const ImageWithSpinner = ({ src,}: {src : string}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false); // Hide spinner once image is loaded
  };

  return (
    <div className="image-container">
      {loading && <div className="spinner"></div>}
      <img
        src={src}
        height={250} 
        width={350}
        alt="cat.gif"
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
};

export default ImageWithSpinner;