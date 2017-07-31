import 'babel-polyfill'
import Env from '../models/EnvModel'
// import {
//     EnvRead,
//     EnvReadLine
// } from '../utils/envRead'

class EnvControllers {
    /* eslint-disable no-param-reassign*/
    /**
     * Get all Enviroments
     * @param {ctx} Koa Context
     */
    async find(ctx) {
        ctx.body = await Env.find()
    }
    /**
     * Find a Enviroment
     * @param {ctx} Koa Context
     */
    async findById(ctx) {
        try {
            const env = await Env.findById(ctx.params.id)
            if (!env) {
                ctx.throw(404)
            }
            ctx.body = env;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
    /**
     * Add a Enviroment
     * @param {ctx} Koa Context
     */
    async add(ctx) {
        console.log(ctx.request.body)
        let env = new Env({
            Package: ctx.request.body.Package,
            Version: ctx.request.body.Version,
            Depends: ctx.request.body.Depends,
            Origin: ctx.request.body.Origin
        })
        await env.save().catch(err => {
            console.log(err);
        })
    }
    /**
     * Update a Enviroment
     * @param {ctx} Koa Context
     */
    async update(ctx) {
        try {
            const env = await Env.findByIdAndUpdate(ctx.params.id, ctx.request.body)
            if (!env) {
                ctx.throw(404)
            }
            ctx.body = env
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
    /**
     * Delete a Environment
     * @param {ctx} Koa Context
     */
    async delete() {
        try {
            const env = await findByIdAndRemove(ctx.params.id)
            if (!env) {
                ctx.throw(404)
            }
        } catch (err) {
            if (err.name === 'CastErrpr' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
    /* eslint-enable no-param-reassign */
}

export default new EnvControllers()