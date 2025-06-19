"use client";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/ui-components/Toast/Toast";

const EditAboutContent = () => {
  const [aboutDescription, setAboutDescription] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("api/about/create", {
        description: aboutDescription,
        mission,
        vision,
      })
      .then((response) => {
        showToast(response.data.msg, "success");
      })
      .catch((err) => {
        showToast(err.response.data.msg, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbout = () => {
    axiosInstance
      .get("/api/about/getAll")
      .then((response) => {
        const data = response?.data?.data[0];
        setAboutDescription(data.description);
        setMission(data.mission);
        setVision(data.vision);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <div>
      <Card>
        <Card.Title>About Content</Card.Title>
        <Card.Body>
          <form
            className="flex flex-col gap-3 md:gap-7 font-bold "
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              {" "}
              <div className="font-bold pb-1">About Description</div>
              <textarea
                className="custom-text-area"
                placeholder="Enter some text..."
                rows={4}
                value={aboutDescription}
                onChange={(e) => {
                  setAboutDescription(e.target.value);
                }}
                required
              ></textarea>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="w-full">
                {" "}
                <div className="font-bold pb-1">Vision Description</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  required
                  value={vision}
                  onChange={(e) => {
                    setVision(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="w-full">
                {" "}
                <div className="font-bold pb-1">Mission Description</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  value={mission}
                  required
                  onChange={(e) => {
                    setMission(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>

            <div className="md:flex justify-end">
              <div>
                <CustomButton
                  className="md:px-10"
                  type="submit"
                  onLoading={loading}
                  disabled={loading}
                >
                  Update
                </CustomButton>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditAboutContent;
