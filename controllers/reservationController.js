const Reservation = require('../models/Reservation');

exports.createReservation = (req, res) => {
  // Implement logic to create a reservation
  // Ensure that the authenticated user's ID is associated with the reservation

  const {
    date,
    time,
    location,
    vehicleNo,
    mileage,
    message,
  } = req.body;

  const userId = req.user.id; // Assuming you have the user's ID in the JWT payload

  Reservation.create({
    date,
    time,
    location,
    vehicleNo,
    mileage,
    message,
    UserId: userId, // Associate the reservation with the authenticated user
  })
    .then((reservation) => {
      return res.status(201).json({ message: 'Reservation created successfully', reservation });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    });
};
