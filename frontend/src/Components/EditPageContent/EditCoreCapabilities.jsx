import React, { useEffect, useState } from "react";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import Card from "@/Components/Card/Card";
import { MdDelete } from "react-icons/md";
import CustomAccordion from "../CustomAccordian/CustomAccordian";
import axiosInstance from "@/utils/axiosInstance";
import { FaSquarePlus } from "react-icons/fa6";
import { showToast } from "@/ui-components/Toast/Toast";

const EditCoreCapabilities = () => {
  const [description, setDescription] = useState("");
  const [capabilities, setCapabilities] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allDataLoading, setAllDataLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubpoint, setNewSubpoint] = useState("");
  const [currentSubpoints, setCurrentSubpoints] = useState([]);

  const handleAddSubpoint = () => {
    if (!newTitle.trim()) {
      showToast("Capability title is required to add subpoints");
    } else {
      if (newSubpoint.trim()) {
        setCurrentSubpoints([...currentSubpoints, newSubpoint.trim()]);
        setNewSubpoint("");
      }
    }
  };

  const handleUpdate = async () => {
    // Combine new capability if any
    let updatedCapabilities = [...capabilities];

    if (newTitle.trim() && currentSubpoints.length > 0) {
      const newCapability = {
        title: newTitle.trim(),
        subpoints: [...currentSubpoints],
      };
      updatedCapabilities = [...updatedCapabilities, newCapability];
    }

    // Merge with existing capabilities from allData[0]
    if (allData[0]?.capabilities) {
      updatedCapabilities = [
        ...allData[0].capabilities,
        ...updatedCapabilities,
      ];
    }

    // Prepare payload
    const payload = {
      description,
      capabilities: updatedCapabilities,
    };

    try {
      const response = await axiosInstance.post(
        "api/capabilities/create",
        payload
      );
      showToast(response.data.message, "success");

      // Reset form inputs
      setNewTitle("");
      setCurrentSubpoints([]);
      setCapabilities([]);
      getAllCapabilities(); // Refresh data from the backend
    } catch (error) {
      showToast(error.response?.data?.message || "An error occurred", "error");
    }
  };

  const getAllCapabilities = () => {
    setAllDataLoading(true);
    axiosInstance
      .get("api/capabilities/getAll")
      .then((response) => {
        setAllData(response.data.data);
        setDescription(response.data.data[0].description);
      })
      .catch((error) => {})
      .finally(() => {
        setAllDataLoading(false);
      });
  };
  useEffect(() => {
    getAllCapabilities();
  }, []);
  return (
    <div>
      <Card>
        <Card.Title>Core Capabilities</Card.Title>
        <Card.Body>
          <form className="flex flex-col gap-7 font-bold ">
            {/* Description Section */}
            <div className="w-full">
              <div className="font-bold pb-1">Description</div>
              <textarea
                className="custom-text-area"
                placeholder="Enter some text..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Add Accordion Section */}
            <div className="w-full">
              <div className="font-bold pb-1">Add Capability Title</div>
              <textarea
                className="custom-text-area"
                placeholder="Enter Capability Title..."
                rows={2}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              ></textarea>
              <div className="font-bold py-1">Add Subpoint</div>
              <div className="flex md:flex-row flex-col items-center gap-3">
                <textarea
                  className="custom-text-area md:w-[50%]"
                  placeholder="Enter Subpoint..."
                  rows={2}
                  value={newSubpoint}
                  onChange={(e) => setNewSubpoint(e.target.value)}
                ></textarea>
                <div>
                  <FaSquarePlus
                    onClick={handleAddSubpoint}
                    className="text-4xl cursor-pointer"
                    title="Add Subpoint"
                  />
                </div>
              </div>
              {/* Display Current Subpoints */}
              {currentSubpoints.length > 0 && (
                <>
                  <div className="font-bold py-1 mt-2">Subpoint List</div>
                  <div className="border border-black rounded-xl  px-3 pb-3 md:w-1/2 ">
                    <ul>
                      {currentSubpoints.map((subpoint, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 py-2 justify-between border-b border-black"
                        >
                          {subpoint}
                          <div>
                            <MdDelete
                              onClick={() =>
                                setCurrentSubpoints(
                                  currentSubpoints.filter((_, i) => i !== index)
                                )
                              }
                              className="cursor-pointer hover:text-red-500 text-xl"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Update Button */}
            <div className=" flex  justify-end  ">
              <div>
                <CustomButton
                  onClick={handleUpdate}
                  className="md:px-10"
                  type={"button"}
                >
                  Update
                </CustomButton>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-2 pt-4 border-t">
              <div className="font-bold pb-2 text-xl">
                Capabilities Accordion Preview
              </div>
              {allDataLoading ? (
                <div className="text-center pt-3 text-lg font-bold">
                  Loading ....
                </div>
              ) : (
                <div>
                  <CustomAccordion
                    data={allData[0]?.capabilities}
                    isAdmin={true}
                    onCallParentFunction={getAllCapabilities}
                  />
                </div>
              )}
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditCoreCapabilities;
