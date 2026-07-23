import { useEffect, useRef, useState, useContext } from 'react';

function GalleryManager(){

    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Handle the file selection event
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            // Convert FileList to a standard JavaScript Array
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
      
            // Optional: Reset value so selecting the same file again triggers onChange
            event.target.value = ""; 
        }
    };

    // Trigger the hidden native input click
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };


    return(
        <>
            <p>Add Images</p>

            {/* 1. HIDDEN NATIVE INPUT */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple // Allows selecting more than one file
                accept="image/*,.pdf" // Restricts formats to images and PDFs
                style={{ display: "none" }} 
            />

            {/* 2. CUSTOM STYLED BUTTON */}
            <button onClick={triggerFileSelect}>
                Choose Files
            </button>

            {/* 3. DISPLAY SELECTED FILES */}
            <h4>Selected Files:</h4>
            {selectedFiles.length === 0 ? (
            <p>No files chosen yet.</p>
            ) : (
            <ul>
                {selectedFiles.map((file, index) => (
                    <li key={index}>
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </li>
                ))}
            </ul>
            )}
        </>
    );

}

export default GalleryManager