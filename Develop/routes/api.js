const router = require("express").Router();
const {Workout} = require ("../models");
const path = require("path")

router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
);

router.get("/exercise", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
);

router.get("/stats", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/stats.html"))
);


router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
      params.id,
      {$push:{exercises:body}},
      {new:true, runValidators:true}
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate( [
    {
        $addFields: {
            totalDuration:{
                $sum:"$exercises.duration"
            }
        }
    }
  ]
)
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get("/api/workouts", (req, res) => {
    Workout.aggregate( [
        {
            $addFields: {
                totalDuration:{
                    $sum:"$exercises.weight"
                }
            }
        }
    ])
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  // router.delete("/api/workouts/:id", (req, res) => {
  //   Workout.findByIdAndDelete(
  //       params.id,
  //       {$destroy:{exercises:body}},
  //   )
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.status(400).json(err);
  //     });
  // });

module.exports = router;