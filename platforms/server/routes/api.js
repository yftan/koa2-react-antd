import Router from 'koa-router'
const koaBody  = require('koa-body')({multipart:true})
import indexCtrl from '../controllers/indexCtrl'
import usersCtrl from '../controllers/usersCtrl'
import serverCtrl from '../controllers/serverCtrl'
import newsCtrl from '../controllers/newsCtrl'
import aboutCtrl from '../controllers/aboutCtrl'
import notesCtrl from '../controllers/notesCtrl'
import envCtrl from '../controllers/envCtrl'
import summaryCtrl from '../controllers/summaryCtrl'
import linechartCtrl from '../controllers/linechartCtrl'
import envControlls from '../controllers/env'
import jobControlls from '../controllers/jobControllers'
import riverPtInfoControllers from '../controllers/RiverPtInfoControllers'
const router = new Router()
router.prefix('/api')

router.get('/', indexCtrl)
router.get('/server', serverCtrl)
router.get('/news', newsCtrl)
router.get('/about', aboutCtrl)
router.get('/users', usersCtrl)
router.get('/notes', notesCtrl)
router.get('/summary',summaryCtrl)
router.get('/linechart',linechartCtrl)

/*==============================Env Router=========================================*/
router.get('/env', envCtrl)
// GET /api/envs
router.get('/envs',envControlls.find)

// POST /api/envs
// This route is protected, call POST /api/authenticate to get the token
router.post('/envs/add',envControlls.add)

// GET /api/envs/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/envs/:id',envControlls.findById)

// PUT /api/envs/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/envs/:id', envControlls.update)

// DELETE /api/envs/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/envs/:id',envControlls.delete)
/*===============================Env Router End===================================*/

/*===============================Job Router Start=================================*/
router.get('/jobs/all',jobControlls.find)

router.get('/jobs/:j_num',jobControlls.getByNum)

router.delete('/jobs/:j_num',jobControlls.delete)

router.post('/jobs',jobControlls.add)
/*===============================Job Router End===================================*/

/*===============================RiverPtInfo Router Start=================================*/
router.post('/riverptinfo',koaBody,riverPtInfoControllers.add)
/*===============================RiverPtInfo Router End=================================*/

export default router