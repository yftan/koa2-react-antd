/**
 * Created by tanyufeng on 2017/6/29.
 */
import Env from '../models/EnvModel'
//import {EnvReadLine} from '../utils/envRead'
export default async(ctx, next) => {
	//EnvReadLine("123")
	ctx.body = await Env.find()
	// ctx.body = [{
	// 	key: '1',
	// 	packageName: 'libotbmathparser',
	// 	version: 1.5,
	// 	address: 'Ubuntu',
	// 	denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
	// 	description: 'SAGA GIS Python bindings'
	// }, {
	// 	key: '2',
	// 	packageName: 'libotbmathParser',
	// 	version: 2.0,
	// 	address: 'CentOS6',
	// 	denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
	// 	description: 'osgEarth development files'
	// }, {
	// 	key: '3',
	// 	packageName: 'libotbossimplugins',
	// 	version: 3.0,
	// 	address: 'Ubuntu',
	// 	denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
	// 	description: 'Generic Mapping Tools'
	// }, {
	// 	key: '4',
	// 	packageName: 'libotbpolarimetry',
	// 	version: 2.0,
	// 	address: 'CentOS7',
	// 	denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
	// 	description: 'ORFEO Toolbox comand line'
	// }];
}