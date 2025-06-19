module.exports = async (err, req, res, next) => {
  try {
    const { upperCaseFirst } = await import("upper-case-first");

    console.log(err);
    if (err && err.code === 11000) {
      let errorKey = Object.keys(err["keyPattern"]).toString();
      errorKey = upperCaseFirst(errorKey);
      return res.status(400).send({ msg: errorKey + " already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).send({
        msg: Object.values(err.errors).map((val) => val.message),
      });
    } else {
      return res.status(400).send({ msg: err.message });
    }
  } catch (error) {
    console.error("Error loading upper-case-first:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
