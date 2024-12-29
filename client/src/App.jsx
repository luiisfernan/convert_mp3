import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/convert', formData, {
        responseType: 'blob', // Necesario para descargar el archivo
      });

      // Crear enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${file.name.split('.')[0]}.mp3`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error al convertir el archivo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center bg-customGit">
      <h1 className="font-semibold text-white mb-6">Convertidor de Audio a MP3</h1>
      <div className="bg-customGit p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="border-dashed border-4 border-gray-300 p-8 flex flex-col items-center justify-center text-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-lg text-gray-600 mb-4">Arrastra y suelta tu archivo de música aquí, o haz clic para seleccionar un archivo</p>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="audio/*"
          />
          <button
            className="px-6 py-2 bg-customGit text-white rounded-lg hover:border-b-indigo-600"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Seleccionar archivo
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-customBlue text-white px-6 py-2 rounded-lg hover:border-cyan-400 focus:outline-none w-full mt-4"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? 'Convirtiendo...' : 'Convertir a MP3'}
          </button>
          {file && !isLoading && (
            <div className="mt-4 text-white">
              <p>Archivo seleccionado: {file.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
