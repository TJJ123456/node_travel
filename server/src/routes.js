// import foodRoute from './routes/foodRoute';
// import hotelRoute from './routes/hotelRoute';
// import spotRoute from './routes/spotRoute';
import dataRoute from './routes/dataRoute';
// import planRoute from './routes/planRoute';
import userRoute from './routes/userRoute';
import commentRoute from './routes/commentsRoute';
import postRoute from './routes/postRoute';
// import entertainmentRoute from './routes/entertainmentRoute';
import searchRoute from './routes/searchRoute';

function privateRoute(req, res, next) {
  if (!req.user) {
    res.status(403).send('Unauthorized')
  } else {
    next()
  }
}

function sendManagerInfo(req, res) {
  res.json({
    manager: req.session.manager,
  })
}

export default function (app) {
  // app.use('/food', foodRoute);
  app.use('/data', dataRoute);
  // app.use('/hotel', hotelRoute);
  // app.use('/spot', spotRoute);
  // app.use('/plan', planRoute);
  app.use('/user', userRoute);
  app.use('/comment', commentRoute);
  app.use('/posts', postRoute);
  // app.use('/entertainment', entertainmentRoute);
  app.use('/search', searchRoute);

  app.get('/manager1', (req, res) => {
    if (!req.session.manager) {
      res.send('null')
    } else {
      return sendManagerInfo(req, res)
    }
  })

  app.post('/managerLogin', (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === '123') {
      req.session.manager = true;
      res.json({
        manager: true
      })
    } else {
      res.json({
        manager: false
      })
    }
  })
  app.get('/managerLogout', (req, res, next) => {
    req.session.manager = null;
    res.json({
      status: 'ok'
    })
  })
}
