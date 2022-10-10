import React, { useState, Fragment } from "react";

const ActivityFeedComponent=()=>{
    return (
      <Fragment>
          <head>
        <title>Instaphoto</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        </head>
        <body class="mb-5">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
            <div class="d-flex align-items-center justify-content-between w-100">
                <a class="navbar-brand" href="#">
                    <img src='../images/logo.PNG' class="instaPhotoLogo"/>
                    
                </a>



            </div>
            </div>
            </nav>



        </body>

      </Fragment>
      )
}
export default ActivityFeedComponent;
