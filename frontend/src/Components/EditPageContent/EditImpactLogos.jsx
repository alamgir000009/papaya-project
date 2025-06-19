"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import Card from "@/Components/Card/Card";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { showToast } from "@/ui-components/Toast/Toast";
import axiosInstance from "@/utils/axiosInstance";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const EditImpactLogos = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [getDataLoading, setGetDataLoading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModel, setShowConfirmationModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [previewData, setPreviewData] = useState("");
  const [formData, setFormData] = useState({
    mainHeading: "",
    logo: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validImageTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heif",
        "image/heic",
      ];

      if (!validImageTypes.includes(file.type)) {
        showToast(
          "Please upload a valid image file (png, jpeg, etc.).",
          "error"
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewData(event.target.result); // Set the preview for the uploaded image
      };
      reader.readAsDataURL(file); // Convert file to Base64 URL for preview

      setFormData((prevState) => ({
        ...prevState,
        logo: file, // Store the raw file object in the state
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = new FormData();
    payload.append("name", formData.mainHeading);

    if (formData.logo) {
      payload.append("logo", formData.logo);
    }
    setLoading(true);
    axios
      .post(`${apiBaseUrl}/api/logos/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showToast(response.data.message, "success");
        setFormData({ mainHeading: "", logo: null });
        handleGetData();
        setPreviewData("");
      })
      .catch((error) => {
        showToast(error.response.data.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetData = () => {
    setGetDataLoading(true);
    axiosInstance
      .get("api/logos/getAll")
      .then((response) => {
        // Update image URLs by removing 'uploads\\' and prepending the base URL
        const updatedData = response.data.data.map((item) => ({
          ...item,
          logoUrl: `${apiBaseUrl}/${item.logoUrl.replace("uploads\\", "")}`,
        }));
        setAllData(updatedData);
      })
      .catch((error) => {})
      .finally(() => {
        setGetDataLoading(false);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);
  const handleConfirmDelete = () => {
    setShowConfirmationModel(false);
    setDeleteLoading(true);

    axiosInstance
      .delete(`api/logos/delete?aboutId=${selectedItem}`)
      .then((response) => {
        showToast(response.data.msg, "success");
        handleGetData();
      })
      .catch((error) => {
        showToast(error.response.data.msg, "error");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  return (
    <div>
      <Card>
        <Card.Title>Impact Logos</Card.Title>
        <Card.Body>
          <form
            className="flex flex-col gap-3 md:gap-7 font-bold"
            onSubmit={handleSubmit}
          >
            <div className="flex md:flex-row flex-col gap-4">
              <div className="w-full">
                <div className="font-bold pb-1">Logo name</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  name="mainHeading"
                  value={formData.mainHeading}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="w-full">
              <div className="font-bold pb-2">Upload Logo</div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="custom-file-input"
              />
            </div>

            {previewData && (
              <div>
                <div className="font-bold pb-1">Preview:</div>
                <div className="flex  ">
                  {previewData && (
                    <Image
                      src={previewData}
                      width={150}
                      height={150}
                      alt="Preview"
                    />
                  )}
                </div>
              </div>
            )}
            <div className="md:flex justify-end">
              <div>
                <CustomButton
                  className="md:px-10"
                  type="submit"
                  onLoading={loading}
                  disabled={loading}
                >
                  Submit
                </CustomButton>
              </div>
            </div>
          </form>
          <div className="py-4 mt-6 border-t font-extrabold text-2xl text-center">
            All Logos
          </div>
          {getDataLoading ? (
            <div className="text-xl font-bold text-center py-4">
              Loading Data...
            </div>
          ) : allData.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {allData.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex items-center bg-[#F6F2EF] gap-2 border rounded-2xl relative px-3 py-10"
                  >
                    <MdDelete
                      className="absolute top-2 right-2 text-xl cursor-pointer hover:text-red-500"
                      title="Delete"
                      onClick={() => {
                        setShowConfirmationModel(true);
                        setSelectedItem(item._id);
                      }}
                    />
                    <div>
                      <Image
                        src={item.logoUrl}
                        width={100}
                        height={100}
                        alt="logos"
                      />
                    </div>
                    <div className="smd:text-[24px] text-[18px] font-extrabold leading-[20px]">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xl font-bold text-center py-4 ">
              No record found
            </div>
          )}
        </Card.Body>
      </Card>
      {showConfirmationModel && (
        <ConfirmationModal
          title={"Confirm Delete"}
          message={"This action cannot be undo."}
          onCancel={() => {
            setShowConfirmationModel(false);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default EditImpactLogos;
