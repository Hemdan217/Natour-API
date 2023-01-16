import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from './../controllers/tourController.js';

const tourRouter = express();

/// Get All Tours , Or Create New Tour
tourRouter.route('/').get(getAllTours).post(createTour);

/// Get Specific Tour , Or Update Or Delete Tour  by ID

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;
/// READING THE DATA FILE
/// READING THE DATA FILE
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: { tours },
//   });
// };

// const getTour = (req, res) => {
//   console.log(req.params);
//   const tour = tours.find((ele) => ele.id === 1 * req.params.id);

//   if (tour) {
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } else {
//     res.status(200).json({
//       status: 'fail',
//       message: 'The tour was not found',
//     });
//   }
// };

// const updateTour = (req, res) => {
//   console.log(req.params);
//   const tour = tours.find((ele) => ele.id === 1 * req.params.id);

//   if (tour) {
//     res.status(200).json({
//       status: 'success',
//       data: 'update',
//     });
//   } else {
//     res.status(200).json({
//       status: 'fail',
//       message: 'The tour was not found',
//     });
//   }
// };
// const deleteTour = (req, res) => {
//   console.log(req.params);
//   const tour = tours.find((ele) => ele.id == req.params.id);

//   if (tour) {
//     res.status(200).json({
//       status: 'success',
//       data: 'Deleted',
//     });
//   } else {
//     res.status(200).json({
//       status: 'fail',
//       message: 'The tour was not found',
//     });
//   }
// };
// const creteTour = (req, res) => {
//   /// console.log(req.body);

//   const newID = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newID }, req.body);
//   tours.push(newTour);

//   // WRITTING THE FILE DATA
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: { newTour },
//       });
//     }
//   );
// };

// tourRouter.route('/').get(getAllTours).post(creteTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// export default tourRouter;
