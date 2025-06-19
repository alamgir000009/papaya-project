"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import Card from "@/Components/Card/Card";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import Spinner from "@/ui-components/Spinner/Spinner";
import { showToast } from "@/ui-components/Toast/Toast";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const EditServicesContent = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [showConfirmationModel, setShowConfirmationModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [originalServices, setOriginalServices] = useState([]);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    mainHeading: "",
    mainImage: null,
    mainImagePreview: "",
    serviceHeading: "",
    serviceDescription: "",
    serviceIcon: null,
    serviceIconPreview: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/heif",
        "image/heic",
      ];

      if (!validImageTypes.includes(file.type)) {
        showToast("Please upload a valid image file.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          [type]: file,
          [`${type}Preview`]: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Check if changes have been made
    const isMainSectionChanged =
      formData.mainHeading.trim() || formData.mainImage; // Checks if main heading or image is updated

    const isNewServiceValid =
      formData.serviceHeading.trim() ||
      formData.serviceDescription.trim() ||
      formData.serviceIcon; // Checks if any new service field is updated

    if (!isMainSectionChanged && !isNewServiceValid) {
      showToast("Please make changes before submitting.", "error");
      return; // Exit if no changes are made
    }

    setLoading(true);
    const payload = new FormData();
    const token = localStorage.getItem("token");

    // Add main section title and image
    if (formData.mainHeading.trim()) {
      payload.append("sectionTitle", formData.mainHeading);
    }
    if (formData.mainImage) {
      payload.append("mainImage", formData.mainImage);
    }

    // Include existing services in the payload
    originalServices.forEach((service, index) => {
      payload.append(`services[${index}][title]`, service.title);
      payload.append(`services[${index}][description]`, service.description);
      if (service.icon) {
        payload.append(`services[${index}][icon]`, service.icon);
      }
    });

    // Append the new service only if it has valid data
    if (isNewServiceValid) {
      const newServiceIndex = originalServices.length;
      if (formData.serviceHeading.trim()) {
        payload.append(
          `services[${newServiceIndex}][title]`,
          formData.serviceHeading
        );
      }
      if (formData.serviceDescription.trim()) {
        payload.append(
          `services[${newServiceIndex}][description]`,
          formData.serviceDescription
        );
      }
      if (formData.serviceIcon) {
        payload.append(
          `services[${newServiceIndex}][icon]`,
          formData.serviceIcon
        );
      }
    }

    axios
      .post(`${apiBaseUrl}/api/services/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showToast("Service updated successfully.", "success");
        setFormData({
          mainHeading: "",
          mainImage: null,
          mainImagePreview: "",
          serviceHeading: "",
          serviceDescription: "",
          serviceIcon: null,
          serviceIconPreview: "",
        });
        handleGetAllServices();
      })
      .catch((error) => {
        showToast("Error adding service.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetAllServices = async () => {
    setGetDataLoading(true);
    await axiosInstance
      .get("api/services/getAll")
      .then((response) => {
        setOriginalServices(response.data.data[0].services);
        if (response.data.data.length === 0) {
          setFormData((prevState) => ({
            ...prevState,
            mainHeading: "",
            mainImagePreview: "",
          }));
          setAllServices([]);
          return;
        }

        const mainData = response.data.data[0];
        const updatedMainImage = `${apiBaseUrl}/${mainData.mainImage.replace(
          "uploads\\",
          ""
        )}`;

        setFormData((prevState) => ({
          ...prevState,
          mainHeading: mainData.sectionTitle || "",
          mainImagePreview: updatedMainImage,
        }));

        const updatedServices = mainData.services.map((service) => ({
          ...service,
          icon: service.icon
            ? `${apiBaseUrl}/${service.icon.replace("uploads\\", "")}`
            : "",
        }));

        setAllServices(updatedServices);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        showToast("Error fetching services.", "error");
      })
      .finally(() => {
        setGetDataLoading(false);
      });
  };

  useEffect(() => {
    handleGetAllServices();
  }, []);

  const handleConfirmDelete = () => {
    setShowConfirmationModel(false);
    setDeleteLoading(true);

    axiosInstance
      .delete(`api/services/delete?aboutId=${selectedItem}`)
      .then((response) => {
        showToast("Service deleted successfully.", "success");
        handleGetAllServices();
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        showToast("Error deleting service.", "error");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <Card.Title>Services</Card.Title>
        <Card.Body>
          <form
            className="flex flex-col gap-3 md:gap-7 font-bold"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-4">
              <div className="w-full">
                <div className="font-bold pb-1">Main Heading</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  name="mainHeading"
                  value={formData.mainHeading}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="w-full">
                <div className="font-bold pb-1">Main Image</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "mainImage")}
                />
              </div>
            </div>

            {formData.mainImagePreview && (
              <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden w-full">
                <Image
                  src={formData.mainImagePreview}
                  alt="mainImagePreview"
                  fill
                  className="object-contain rounded-3xl"
                />
              </div>
            )}

            <div className="flex md:flex-row flex-col gap-4">
              <div className="w-full">
                <div className="font-bold pb-1">Service Heading</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  name="serviceHeading"
                  value={formData.serviceHeading}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="w-full">
                <div className="font-bold pb-1">Service Description</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  name="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="w-full">
              <div className="font-bold pb-1">Service Icon</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "serviceIcon")}
              />
            </div>

            {formData.serviceIconPreview && (
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={formData.serviceIconPreview}
                  alt="serviceIconPreview"
                  fill
                />
              </div>
            )}

            <div className="md:flex justify-end">
              <div>
                <CustomButton
                  className="md:px-10"
                  onClick={handleSubmit}
                  disabled={loading}
                  onLoading={loading}
                >
                  Add
                </CustomButton>
              </div>
            </div>
          </form>

          {getDataLoading ? (
            <div className="font-bold text-center pb-4 text-xl smd:text-2xl">
              Loading Services...
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-3 md:gap-6 py-3 md:py-6">
              {allServices?.map((item, index) => {
                return (
                  <div
                    className="lg:col-span-4 col-span-12 rounded-3xl bg-gray-400 p-6 flex flex-col gap-3 relative"
                    key={index}
                  >
                    <div className="absolute top-2 right-2 flex gap-2 items-center">
                      {deleteLoading ? (
                        <Spinner />
                      ) : (
                        <MdDelete
                          className="text-3xl hover:text-red-400 cursor-pointer"
                          onClick={() => {
                            setShowConfirmationModel(true);
                            setSelectedItem(item._id);
                          }}
                        />
                      )}
                    </div>

                    {item?.icon && (
                      <div>
                        <Image
                          src={item?.icon}
                          alt="network"
                          width={75}
                          height={75}
                        />
                      </div>
                    )}
                    <div className="text-[20px] leading-[24px] text-white font-bold">
                      {item?.title}
                    </div>
                    <div className="text-[14px] text-[#FEFEFE] font-[300] leading-[19px]">
                      {item?.description}
                    </div>
                  </div>
                );
              })}
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

export default EditServicesContent;
