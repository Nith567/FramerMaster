// 'use client'
// import React, { useState } from 'react';
// import { Livepeer } from 'livepeer';



// export default function VideoUploader() {

//   const apiKey = '7a204e32-d612-4c79-8c99-386c063da1a3';
//   const livepeer = new Livepeer({apiKey:"7a204e32-d612-4c79-8c99-386c063da1a3"});

//   const pil=()=>{
//   const streamData = {
//     name: "test_stream53"
//   };
  
//   livepeer
//     .stream.create(streamData)
//     .then((response) => {
//       console.log("Stream created:", response);
//     })
//     .catch((error) => {
//       console.error("Error creating stream:", error);
//     });
//   }
//   return (
//     <>
//     {/* <button onClick={pil}>Hiiii</button> */}
//     </>
//   )

// }