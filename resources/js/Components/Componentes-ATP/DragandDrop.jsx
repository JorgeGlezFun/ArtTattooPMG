import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DragAndDrop() {
  const [file, setFile] = useState();

  const onDrop = useCallback(acceptedFiles => {
    setFile(Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0])
    }));
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*', multiple: false});

  return (
    <div {...getRootProps()} className='flex flex-col w-auto h-52 justify-center items-center p-2 border-4 border-black border-dashed'>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Suelta la imagen aquí...</p> :
          <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>
      }
      <div>
        {file && (
          <div key={file.name}>
            <div className='flex items-center justify-center'>
              <img src={file.preview} className='w-48 h-48' alt="preview" />
            </div>
            <div>
              {file.path} - {file.size} bytes
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
