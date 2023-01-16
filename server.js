import app from './app.js';

app.listen(3000, () => {
  console.log('listening on port 3000');
});

// /// POST REQUEST HANDLING
// app.post('/api/v1/tours', );
// /// Get Tour by Id , Responding to URL params
// /// Update Tour by Id , Responding to URL params
// app.patch('/api/v1/tours/:id', );
// /// Delete Tour by Id , Responding to URL params
// app.delete('/api/v1/tours/:id', );
// /// Delete Tour by Id , Responding to URL params
// app.delete('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);
//   const index = tours.findIndex((ele) => ele.id == req.params.id);

//   const undeletedTours = tours.splice(index, 1);

//   if (index) {
//     fs.writeFile(
//       `${__dirname}/dev-data/data/tours-simple.json`,
//       JSON.stringify(undeletedTours),
//       (err) => {
//         res.status(201).json({
//           status: 'success',
//           data: { undeletedTours },
//         });
//       }
//     );
//   } else {
//     res.status(200).json({
//       status: 'fail',
//       message: 'The tour was not found',
//     });
//   }
// });
