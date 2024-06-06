import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ModalImage from "react-modal-image";

function Home() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');


  const fetchImages = async () => {
    try {
      const response = await axios.get('https://vkixlx1as3.execute-api.us-east-1.amazonaws.com/dev/image'); 
      const imagesData = JSON.parse(response.data.body); // Parse the response body
      setImages(imagesData);
      console.log(imagesData);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result.split(',')[1];
      const fileType = file.type;
      const fileName = file.name;

      const payload = {
        fileName,
        fileType,
        fileContent: base64File,
      };

      try {
        const response = await axios.post('https://vkixlx1as3.execute-api.us-east-1.amazonaws.com/dev/image', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage('File uploaded successfully');
        // Fetch the updated list of images after a successful upload
        fetchImages();
      } catch (error) {
        setMessage('File upload failed');
        console.error('File upload failed:', error.response ? error.response.data : error.message);
      }
    };
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <NavBar />
        <div className="flex flex-row justify-between items-center w-5/6 border-b-2 pb-5 mt-10 overflow-y-auto">
          <p className="text-3xl font-bold">Shared Images</p>
          <div className="flex flex-row justify-center items-center border-2 rounded-xl px-2 ">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="mr-4 text-lg font-medium py-2 gap-4"
            />
            <button
              className="flex justify-center text-lg font-medium items-center bg-blue py-1 px-2 rounded-md"
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <p>{message}</p>
          </div>
        </div>

        <div className="mt-5 mb-10 w-5/6 h-fill p-5 grid grid-cols-4 gap-4">
          {Array.isArray(images) && images.map((image, index) => (
            <ModalImage
              key={index}
              small={image.url}
              large={image.url}
              alt={`Shared image ${index + 1}`}
              className=" h-64 w-64 object-cover rounded-lg shadow-md flex justify-center items-center"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
