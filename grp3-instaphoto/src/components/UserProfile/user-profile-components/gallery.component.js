import React, { useState, Fragment} from "react";
import '../userprofile.css';
// import Sidebar from './sidebar.component'

const Gallery =({imageSrc, postCount})=>{

    console.log('printing within gallery' + postCount);
    
    if (imageSrc!== 'default') {
        console.log("You added an image")
        const galleryItemElem = document.createElement('div');
        galleryItemElem.className = 'gallery-item';
    
        const myImage = document.createElement('img');
        myImage.src=imageSrc.src;
        myImage.className = 'gallery-image';

        galleryItemElem.appendChild(myImage);
        // this.props.profileRef.current.scrollTo(50).prepend(galleryItemElem);
        document.getElementById("gallery").prepend(galleryItemElem);
    }
    return (
        <Fragment>
      <header>

<div className="container">
    <div className="profile">
        <div className="profile-image">
            {/* <img src={require('../images/grp3.PNG')} alt=""/> */}
        </div>
        <div className="profile-user-settings">
            <h1 className="profile-user-name">grp3foreva</h1>
        </div>
        <div className="profile-stats">
            <ul>
                <li><span className="profile-stat-count">{postCount}</span> posts</li>
                <li><span className="profile-stat-count">169</span> followers</li>
                <li><span className="profile-stat-count">667</span> following</li>
            </ul>
        </div>
    </div>
</div>
</header>

<main>

<div className="gallery" id = "gallery">
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
    <div className="gallery-item">
        <img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
    </div>
</div>


<script>
    
</script>

</main>

</Fragment>


    )  
}

export default Gallery;