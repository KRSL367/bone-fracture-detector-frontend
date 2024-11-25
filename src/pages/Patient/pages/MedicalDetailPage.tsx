import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MedicalData } from "../hooks/useFetchPatient";
import { useFetchMedicalDetail } from "../hooks/useFetchMedicalDetail";

const MedicalDetailPage = () => {
  const location = useLocation();
  const { medical_id, patient_id } = location.state || {};

  const [medicalData, setMedicalData] = useState<MedicalData | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchMedicalData = async () => {
      if (medical_id && patient_id) {
        try {
          const response = await useFetchMedicalDetail(patient_id, medical_id);
          setMedicalData(response.data);
        } catch (error) {
          console.error("Error fetching medical data:", error);
        }
      } else {
        console.error("Patient ID or Medical ID is missing.");
      }
    };

    fetchMedicalData();
  }, [medical_id, patient_id]);

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    console.log("Images uploaded:", selectedImages);
  };

  return (
    <div className="p-6">
      {/* Heading Section */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Details</h1>
        {medicalData ? (
          <div className="mt-4">
            <p>
              <strong>ID:</strong> {medicalData.id}
            </p>
            <p>
              <strong>Description:</strong> {medicalData.description}
            </p>
            <p>
              <strong>Uploaded At:</strong> {new Date(medicalData.uploaded_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading medical details...</p>
        )}
      </section>

      <div className="grid grid-cols-5 gap-4">
        {/* Left Section (3/5 width) */}
        <div className="col-span-3">
          {/* Medical Data Section */}
          <section className="border border-gray-300 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Medical Data</h2>
            {medicalData?.images && medicalData.images.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto">
                {medicalData.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.image}
                    alt={`Medical Data ${image.id}`}
                    className="w-48 h-48 object-cover rounded-md shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <p>No images available for this medical data.</p>
            )}
          </section>

          {/* Result Data Section */}
          <section className="border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Result Data</h2>
            {medicalData?.diagnosis_report && medicalData.diagnosis_report.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicalData.diagnosis_report.map((report) => (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-md shadow-md overflow-hidden"
                  >
                    <h3 className="bg-gray-100 text-center text-sm font-medium py-2">
                      {report.report}
                    </h3>
                    <div className="p-4 grid gap-4">
                      {report.diagnosis_images && report.diagnosis_images.length > 0 ? (
                        report.diagnosis_images.map((image) => (
                          <img
                            key={image.id}
                            src={image.image}
                            alt={`Diagnosis Report ${report.id} Image ${image.id}`}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center">No images available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No diagnosis reports available for this medical data.</p>
            )}
          </section>
        </div>

        {/* Right Section (2/5 width) */}
        <div
          className="col-span-2 border border-gray-300 rounded-md p-4 flex flex-col gap-4"
          onDrop={handleImageDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload Images</h2>
          <div
            className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center h-48 overflow-auto"
          >
            <p className="text-gray-500 mb-4">
              Drag & drop images here or click to upload
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Select Images
            </label>
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 overflow-auto">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={selectedImages.length === 0}
            className={`mt-4 px-4 py-2 rounded-md ${
              selectedImages.length > 0
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Upload Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalDetailPage;
