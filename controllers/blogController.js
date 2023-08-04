const Blog = require("../models/Blog");
const { cloudinary } = require("../utils/cloudinary");
const asyncWrapper = require("../utils/asyncWrapper");
const Question = require("../models/QuestionsModel");

//create blog
const addBlog = asyncWrapper(async (req, res) => {
  const { title, description, author } = req.body;

  let photo = req.files.image[0].path;
  let result1 = await cloudinary.uploader.upload(photo, {
    upload_preset: "nomad",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  const questions = [];
  for (let i = 0; i < req.body.questions.length; i++) {
    const { qtitle, qdescription } = req.body.questions[i];
    const qimage = req.files["images"][i].path;
    let result = await cloudinary.uploader.upload(qimage, {
      upload_preset: "nomad",
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    const question = new Question({
      qtitle,
      qdescription,
      qimages: result.secure_url,
    });
    questions.push(question);
  }

  for (let j = 0; j < qtitleArr.length; j++) {
    console.log(req.body.qtitle.length, "qtitle");
    if (Array.isArray(req.files.qimage)) {
      {
        let result = await cloudinary.uploader.upload(
          req.files.qimage[j].tempFilePath,
          {
            upload_preset: "nomad",
            public_id: `${Date.now()}`,
            resource_type: "auto",
          }
        );

        var question = {
          title: qtitle[j],
          description: qdesc[j],
          qimage: result.secure_url,
        };
        questionsArray.push(question);
      }
    } else if (req.files.qimage instanceof Object) {
      let result = await cloudinary.uploader.upload(
        req.files.qimage.tempFilePath,
        {
          upload_preset: "nomad",
          public_id: `${Date.now()}`,
          resource_type: "auto",
        }
      );
      var question = {
        title: qtitle,
        description: qdesc,
        qimage: result.secure_url,
        questions,
      };
      questionsArray.push(question);
    }

    // const question = {
    //   title: qtitle[i],
    //   description: qdesc[i],
    //   qimage: result.secure_url,
    // };

    // questionsArray.push(question);
  }
  console.log(questionsArray, "questionsArray");
  const blog = new Blog({
    title,
    author,
    questions,
    images: result1.secure_url,
    description,
    questions: questionsArray,
    // answers: answer,
    // qimages: qimg,
  });
  const savedBlog = await blog.save();
  res.status(200).json(savedBlog);
});

//get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};

//get blog by id
const getBlogById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.status(200).json(blog);
});

//update blog
const updateBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  let firstUpdate = await Blog.findByIdAndUpdate(req.params.id);

  // Update questions
  for (let i = 0; i < req.body.questions?.length; i++) {
    const { qtitle, qdescription } = req.body.questions?.[i] ?? {};
    const qimage = req.files?.["images"]?.[i]?.path;
    let result = qimage
      ? await cloudinary.uploader.upload(qimage, {
          upload_preset: "nomad",
          public_id: `${Date.now()}`,
          resource_type: "auto",
        })
      : {};

    const questionIndex = i;

    if (firstUpdate.questions[questionIndex]) {
      firstUpdate.questions[questionIndex].qtitle =
        qtitle || firstUpdate.questions[questionIndex].qtitle;
      firstUpdate.questions[questionIndex].qdescription =
        qdescription || firstUpdate.questions[questionIndex].qdescription;
      firstUpdate.questions[questionIndex].qimages =
        result.secure_url || firstUpdate.questions[questionIndex].qimages;
    } else {
      firstUpdate.questions.push({
        qtitle: qtitle || "",
        qdescription: qdescription || "",
        qimages: result.secure_url || "",
      });
    }
  }

  // Update other fields
  firstUpdate.title = title || firstUpdate.title;
  firstUpdate.content = content || firstUpdate.content;
  firstUpdate.author = author || firstUpdate.author;

  firstUpdate = await Blog.findByIdAndUpdate(req.params.id, firstUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  const updatedDocument = await firstUpdate.save();
  
  res.status(200).json(updatedDocument);
});

//delete blog
const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  res.status(200).json(deletedBlog);
});

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
