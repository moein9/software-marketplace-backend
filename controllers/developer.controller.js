import CustomError from "../CustomError.js";
import Developer from "../models/developer.model.js";
import User from "../models/user.model.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getDevelopers = async (req, res) => {
  try {
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);

    const excludeQuery = ["sort", "limit", "page", "fields", "search"];

    excludeQuery.forEach((key) => {
      delete queryObj[key];
    });

    if (req.query.search) {
      queryObj.fullname = new RegExp(req.query.search, "i");
    }

    const getQuery = Developer.find(queryObj);

    const countQuery = getQuery.clone();
    const countResults = await countQuery.count();

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const developers = await getQuery;

    res.json({ status: "success", results: countResults, data: developers });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const addDeveloper = tryCatch(async (req, res) => {
  req.body.userId = req.user.sub;
  const developer = await Developer.create(req.body);

  await User.findByIdAndUpdate(req.body.userId, {
    $set: { developerId: developer._id },
  });

  res.json({ status: "success", data: developer });
});

export const getDeveloperById = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id);

    if (!developer) {
      throw new CustomError("Developer not found", 404, 4104);
    }

    res.json({ status: "success", data: developer });
  } catch (err) {
    next(err);
  }
};

export const getDeveloperStats = async (req, res, next) => {
  try {
    const developers = await Developer.aggregate([
      {
        $match: {
          age: { $gte: 10 },
        },
      },
      {
        $group: {
          _id: "$age",
          averageGrade: {
            $avg: "$grade",
          },
          minGrade: {
            $min: "$grade",
          },
          maxGrade: {
            $max: "$grade",
          },
          sumGrade: {
            $sum: "$grade",
          },
          developers: {
            $count: {},
          },
        },
      },
    ]);

    if (!developers) {
      throw new CustomError("Developers not found", 404, 4104);
    }

    res.json({ status: "success", data: developers });
  } catch (err) {
    next(err);
  }
};
