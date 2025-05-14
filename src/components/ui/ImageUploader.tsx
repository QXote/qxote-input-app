import { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const now = new Date();
    const timestamp =
      now.getDate().toString().padStart(2, "0") +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getFullYear().toString() +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0");

    // Genereer bestandsnaam mét extensie
    const ext = file.name.split(".").pop();
    const filename = `${timestamp}.${ext}`;

    // Nieuw bestand maken met de nieuwe naam
    const renamedFile = new File([file], filename, { type: file.type });

    const formData = new FormData();
    formData.append("image", renamedFile); // Belangrijk: heet 'image'

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setStatus(data);
    } catch (error) {
      setStatus("Upload mislukt");
    }
  };

  return (
    <div className="p-4 border rounded shadow w-fit bg-white space-y-4">
      <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded inline-block">
        Klik om een afbeelding te kiezen
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {file && (
        <div className="text-sm text-gray-700">
          <p>Gekozen afbeelding: {file.name}</p>
        </div>
      )}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 max-w-xs max-h-60 rounded border"
        />
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ms-5"
      >
        Upload
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default ImageUploader;
