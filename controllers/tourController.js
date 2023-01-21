import { query } from 'express';
import tourModel from './../models/tourModel.js';

// 1) Getting All The Tours
export const getAllTours = async (req, res) => {
  try {
    const allTours = await tourModel.find();
    res.status(200).json({
      status: 'Success',
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
    // 1) Build the Query
    // Filtering :=>
    console.log(req.query);
    const queryObj = { ...req.query }; // Clone the Req Query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    //* 2) Advanced Filtering ?price[gt]=500
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)/, (match) => `$${match}`);

    const query = tourModel.find(JSON.parse(queryStr));

    // 3) Sorting  ?sort=price,name
    if (req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    } else {
      query = query.sort('-price');
    }
    /// 4)Fields ?fields=price,name
    let specificField = req.query.fields.split(',').join(' ');
    console.log(specificField);
    if (req.query.fields) {
      query = query.select(specificField);
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
