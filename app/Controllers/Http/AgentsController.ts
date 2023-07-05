import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator"
import Agent from 'App/Models/Agent'

export default class AgentsController {
    public async store({ request }: HttpContextContract) {
        const newOrderSchema = schema.create({
            deptId: schema.number(),
            name: schema.string(),
        });
        const payload = await request.validate({ schema: newOrderSchema });
        const agent = await Agent.create(payload);
        return agent;
    }

    public async index() {
        return Agent.all();
    }

      public async update({ request, response, params }: HttpContextContract) {
        try {
          const { name } = await request.validate({
            schema: schema.create({
              name: schema.string(),
            }),
          });
          const agent = await Agent.find(params.id);
          if (!agent) {
            return response.status(404).json({ message: "Agent not found" });
          }
          agent.name = name;
          await agent.save();
          return response.json({ message: "Agent name updated successfully" });
        } catch (error) {
          return response.status(500).json({ message: "Internal Server Error" });
        }
      }
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const agent = await Agent.find(params.id);
          if (!agent) {
            return response.status(404).json({ message: "Agent not found" });
          }
          await agent.delete();
          return response.json({ message: "Deleted agent successfully!" });
        } catch (error) {
          return response.status(500).json({ message: "Internal server error" });
        }
}
}