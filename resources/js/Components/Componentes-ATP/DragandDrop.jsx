import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DragAndDrop({value}) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0])
    });
    setFile(newFile);
  }, []);

  useEffect(() => {
    // Limpieza del objeto URL al desmontar o cambiar el archivo
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  return (
    <div {...getRootProps()} className='flex flex-col w-auto h-52 justify-center items-center p-2 border-4 border-black border-dashed'>
      <input {...getInputProps()} value={value}/>
      {
        !file && ( // Muestra el texto solo si no hay un archivo
          isDragActive ?
            <p>Suelta la imagen aquí...</p> :
            <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>
        )
      }
      <div>
        {file && (
          <div key={file.name}>
            <div className='flex w-full items-center justify-center'>
              <img src={file.preview} className='w-48 h-48 m-4 object-cover' alt="preview" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
