const router = require("express").Router();
const {Workout} = require ("../models");
const path = require("path")

// links to the html pages
router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
);

router.get("/exercise", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
);

router.get("/stats", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/stats.html"))
);

// post route to create workouts
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// put route to updates workouts with new exercises
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

// These two get routes use aggregate to get the total duration and total weight for the charts in the dashboard
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


router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate( [
        {
            $addFields: {
                totalDuration:{
                    $sum:"$exercises.duration"
                }
            }
        }
    ])
      .sort({ date: -1 })
      .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


module.exports = router;