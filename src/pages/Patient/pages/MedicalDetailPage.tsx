import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MedicalData } from "../hooks/useFetchPatient";
import { useFetchMedicalDetail } from "../hooks/useFetchMedicalDetail";
import { usePostMedicalData } from "../hooks/usePostMedicalData";
import { useDeleteMedicalDataImage } from "../hooks/useDeleteMedicalDataImage";
import { FaEdit, FaTimes } from "react-icons/fa";
const MedicalDetailPage = () => {
  const location = useLocation();
  const { medical_id, patient_id } = location.state || {};

  const [medicalData, setMedicalData] = useState<MedicalData | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      setDeletedImageIds([]); // Clear deleted images when exiting edit mode
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleImageDelete = (imageId: number) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
    setMedicalData((prev) => ({
      ...prev!,
      images: prev?.images?.filter((image) => image.id !== imageId) || [],
    }));
  };

  const handleCancel = () => {
    // Exit edit mode and reset state
    setEditMode(false);
    setDeletedImageIds([]);
    // Refresh the data to bring back deleted images
    if (medical_id && patient_id) {
      useFetchMedicalDetail(patient_id, medical_id)
        .then((response) => setMedicalData(response.data))
        .catch((error) =>
          console.error("Error refreshing medical data:", error)
        );
    }
  };

  const handleDeleteUpdate = async () => {
    if (deletedImageIds.length === 0) {
      console.log("No images to delete.");
      return;
    }

    if (!medical_id || !patient_id) {
      console.error("Medical ID or Patient ID is missing.");
      return;
    }

    try {
      const response = await useDeleteMedicalDataImage(
        patient_id,
        medical_id,
        deletedImageIds
      );

      if (response.status === 204) {
        console.log(
          `Successfully deleted ${response.data?.deleted || 0} images.`
        );

        // Optionally, reset deletedImageIds and update the UI
        setDeletedImageIds([]);
        setMedicalData((prev) => ({
          ...prev!,
          images:
            prev?.images?.filter(
              (image) => !deletedImageIds.includes(image.id)
            ) || [],
        }));
        setEditMode(false);
      } else {
        console.error("Failed to delete images:", response.error);
      }
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  const handleUpload = async () => {
    if (!medicalData || !patient_id || !medical_id) {
      console.error("Required data is missing for upload.");
      return;
    }

    setIsUploading(true);
    try {
      const response = await usePostMedicalData(
        patient_id,
        medical_id,
        selectedImages,
        medicalData.id!,
        medicalData.diagnosis_report?.[0]?.id || 0
      );

      if (response.data) {
        console.log("Images uploaded successfully:", response.data);
        setSelectedImages([]); // Clear selected images
        setMedicalData((prev) => ({
          ...prev!,
          images: [...(prev?.images || []), ...(response.data || [])],
        }));
      } else {
        console.error("Failed to upload images:", response.error);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReportClick = (reportId: number | undefined) => {
    navigate(`/reports/${patient_id}/data/${medical_id}/diagnosis-result`, {
      state: {
        patientId: patient_id,
        medicalId: medical_id,
        resultId: reportId,
      },
    });
  };

  return (
    <div className="p-6">
      {/* Heading Section */}
      <section className="mb-6 flex flex-col">
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
              <strong>Uploaded At:</strong>{" "}
              {new Date(medicalData.uploaded_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading medical details...</p>
        )}{" "}
      </section>

      <div className="grid grid-cols-5 gap-4">
        {/* Left Section (3/5 width) */}
        <div className="col-span-3">
          <section className="border border-gray-300 rounded-md p-4 mb-6">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Medical Data
              </h2>
              <button
                onClick={toggleEditMode}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {editMode ? (
                  <>
                    <FaTimes />
                  </>
                ) : (
                  <>
                    <FaEdit />
                  </>
                )}
              </button>
            </div>

            {medicalData?.images && medicalData.images.length > 0 ? (
              <div
                className="flex gap-4 overflow-x-auto"
              >
                {medicalData.images.map((image) => (
                  <div key={image.id} className="relative flex-shrink-0">
                    <img
                      src={image.image}
                      alt={`Medical Data ${image.id}`}
                      className="w-48 h-48 object-cover rounded-md shadow-sm"
                    />
                    {editMode && (
                      <button
                        onClick={() => handleImageDelete(image.id!)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No images available for this medical data.</p>
            )}

            {editMode && (
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            )}
          </section>

          <section className="border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Result Data
            </h2>
            {medicalData?.diagnosis_report &&
            medicalData.diagnosis_report.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicalData.diagnosis_report.map((report) => (
                  <button
                    key={report.id}
                    className="border border-gray-200 rounded-md shadow-md overflow-hidden p-4"
                    onClick={() => handleReportClick(report.id)} // Use an anonymous function
                  >
                    <h3 className="bg-gray-100 text-center text-sm font-medium py-2 mb-4">
                      {report.report}
                    </h3>
                    <div className="relative w-full h-48">
                      {report.diagnosis_images.map((image, index) => (
                        <img
                          key={image.id}
                          src={image.image}
                          alt={`Diagnosis ${report.id}`}
                          className="absolute top-0 left-0 w-32 h-32 object-cover rounded-md shadow-lg"
                          style={{
                            transform: `rotate(${index * 5 - 10}deg)`,
                            zIndex: index,
                            marginLeft: `${index * 10}px`,
                          }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p>No diagnosis reports available.</p>
            )}
          </section>
        </div>

        {/* Right Section (2/5 width) */}
        <div
          className="col-span-2 border border-gray-300 rounded-md p-4 flex flex-col gap-4 h-[480px]"
          onDrop={handleImageDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upload Images
          </h2>
          <div className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center h-48 overflow-auto">
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
                    onClick={() =>
                      setSelectedImages((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalDetailPage;
