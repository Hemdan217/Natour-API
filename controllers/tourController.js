import { query } from 'express';
import tourModel from './../models/tourModel.js';

// 1) Getting All The Tours
export const getAllTours = async (req, res) => {
  try {
    const allTours = await tourModel.find();
    res.status(200).json({
      status: 'Success',
      number: allTours.length,
      data: { allTours },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      Message: e,
    });
  }
};

//* */ 1-1) Getting All The Tours Filtered
export const getAllToursFilter = async (req, res) => {
  try {
    // console.log(req.query);
    //BUILD QUERY
    // 1)Filtering :=>
    const queryObj = { ...req.query }; // Clone the Req Query
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    // //* 2) Advanced Filtering ?price[gt]=500
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    queryStr = JSON.parse(queryStr);
    let query = tourModel.find(queryStr);

    // console.log(req.query.sort.split(',').join(' '));
    // 3) Sorting  ?sort=price,name
    if (req.query.sort) {
      let sortBy = queryStr.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    /// 4)Fields ?fields=price,name
    let specificField = req.query.fields.split(',').join(' ');
    console.log(specificField);
    if (req.query.fields) {
      query = query.select(specificField);
    }
    /// 5)Pagination  ?page=2&limit=10
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;

    const skip = (page - 1) * limit;
    if (req.query.page) {
      const toursCounts = tourModel.find().countDocuments();
      if (skip > toursCounts) throw new Error();
      query.skip(skip).limit(limit);
    }
    const filteredTours = await query;
    res.status(200).json({
      status: 'Success',
      length: filteredTours.length,
      data: { filteredTours },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      Message: e,
    });
  }
};

// 2) Getting the Specific Tour By ID

export const getTour = async (req, res) => {
  try {
    const Tour = await tourModel.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: { Tour },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      Message: e,
    });
  }
};

/// 3) Creating New Tour
export const createTour = async (req, res) => {
  try {
    // const newTour = await new tourModel({req.body});
    // newTour.save()

    const newTour = await tourModel.create(req.body);
    console.log(req.body);
    res.status(200).json({
      status: 'Success',
      data: { newTour },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      Message: e,
    });
  }
};

/// 4) Update Specific Tour By ID
export const updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(400).json({ status: 'error', data: err });
  }
};

/// 5) Delete Specific Tour By ID
export const deleteTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: 'done' });
  } catch (err) {
    res.status(400).json({ status: 'error', data: err });
  }
};

export const getTourStats = async (req, res) => {
  try {
    const stats = await tourModel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
export const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await tourModel.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
