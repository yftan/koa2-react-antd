import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import usersCtrl from '../controllers/usersCtrl'
import serverCtrl from '../controllers/serverCtrl'
import newsCtrl from '../controllers/newsCtrl'
import aboutCtrl from '../controllers/aboutCtrl'
import notesCtrl from '../controllers/notesCtrl'
import envCtrl from '../controllers/envCtrl'
const router = new Router()
router.prefix('/api')

router.get('/', indexCtrl)
router.get('/server', serverCtrl)
router.get('/news', newsCtrl)
router.get('/about', aboutCtrl)
router.get('/users',usersCtrl)
router.get('/notes',notesCtrl)
router.get('/env',envCtrl)

export default router
