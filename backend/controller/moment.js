const Momentmodel = require('../models/add_moment')
const baseUrl = "http://localhost:5000/";

exports.createMoments = async (req, res) => {
  const {
    title,
    comments,
    tags,
  } = req.body;
  if (req.file) {
    var document = req.file.path
} else {
    var document = ""
}

  try {
    const UserdetailData = await Momentmodel.create({
      title,
      file: baseUrl+document,
      comments,
      tags,
    })
    return res.status(200).send({
      message: "create successfully!", data: UserdetailData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserdetailData."
    });
  }
}



exports.getmomentsList = async (req, res) => {
  try {
    const UserdetailData = await Momentmodel.find({})
    console.log("UserdetailData", UserdetailData)
    if (UserdetailData) {
      res.status(200).send({ message: "get all UserdetailData list", data: UserdetailData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.getMomentDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await Momentmodel.findById({
      _id: req.params.id,
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found restaurant")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.editMomentDetails = async (req, res) => {
  try {

    const userdata = await Momentmodel.find({ _id: req.params.id });
    if (userdata) {
      const updateData = await Momentmodel.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.deleteMoments = async (req, res) => {
  try {

    const userdata = await Momentmodel.find({ _id: req.params.id });
    if (userdata) {
      const updateData = await Momentmodel.findByIdAndRemove({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully! " })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.paginationData = async (req, res) => {

  let { page, size, sort } = req.query;
  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 10;
  }

  const limit = parseInt(size);
  const user = await Momentmodel.find().limit(limit)
  res.send({
    page,
    size,
    Info: user,
  });
}







