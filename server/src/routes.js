function privateRoute(req, res, next) {
  if (!req.user) {
    res.status(403).send('Unauthorized')
  } else {
    next()
  }
}

function sendUserInfo(req, res) {
  res.json({
    _id: req.user._id,
    username: req.user.username,
  })
}

function sendManagerInfo(req, res) {
  res.json({
    manager: req.session.manager,
  })
}

export default function (app) {

  app.get('/user', (req, res) => {
    if (!req.user) {
      res.send('null')
    } else {
      return sendUserInfo(req, res)
    }
  })

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
}
