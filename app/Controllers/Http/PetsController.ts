import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/models/Pet'

export default class PetsController {
    public async index(ctx:HttpContextContract){

        return Pet.all()
    }

    public async store({request, response, auth}:HttpContextContract){
        const {name}= request.only(['name'])
        if (!name) {
            return {fail: "nothing"}
        }
        await auth.authenticate();
        const pet= await Pet.create({name})

        response.status(201)
        return pet
    }
    public async destroy({params}:HttpContextContract){
        const pet = await Pet.findOrFail( params.id)
        pet.delete()
        return pet
    }
}
