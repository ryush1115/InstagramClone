//*ImageGrid.js*//

import React from "react";
// Rendering individual images
import '../createpost.css';


const Image = ({ image }) => {
    // console.log(image.src)
  return (
    <div className="file-item">
      <img
        alt={`img - ${image.id}`}
        src={image.src}
        // src={require('${image.src}')}
        // src = {require('../images/logo.PNG')}
        className="file-img"
      />
    </div>
  );
};

// ImageList Component//
const ImageGrid = ({ images, imageSrc, setImageSrc }) => {
  // render each image by calling Image component
  const renderImage = (image, index) => {
    setImageSrc(image)
    console.log("printing within render image")
    console.log(imageSrc)
    return <Image image={image} key={`${image.id}-image`} />;
  };
  // Return the list of files//
  return (
    <div>
    <p> something </p>
    <section className="file-list">{images.map(renderImage)}</section>
    {/* <section className="file-list"><Image/></section> */}
    {/* <img src={require('../images/logo.PNG')} alt="logo" /> */}
    </div>
  );
};

export default ImageGrid;