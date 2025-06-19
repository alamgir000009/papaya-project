"use client";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/ui-components/Toast/Toast";

const EditBannerContent = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("api/mainSection/create", {
        heading,
        description,
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
  const getData = () => {
    axiosInstance
      .get("api/mainSection/getAll")
      .then((response) => {
        const data = response?.data?.data[0];
        setDescription(data?.description);
        setHeading(data?.heading);
      })
      .catch((err) => {
        showToast(err.response.data.msg, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Card>
        <Card.Title>Banner Content</Card.Title>
        <Card.Body>
          <form
            className="flex flex-col gap-3 md:gap-7 font-bold "
            onSubmit={handleSubmit}
          >
            <div className="flex md:flex-row flex-col gap-4">
              <div className="w-full">
                {" "}
                <div className="font-bold pb-1">Banner Heading</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
              <div className="w-full">
                {" "}
                <div className="font-bold pb-1">Banner Description</div>
                <textarea
                  className="custom-text-area"
                  placeholder="Enter some text..."
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
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

export default EditBannerContent;
