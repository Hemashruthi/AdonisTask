import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator";
import Dept from "App/Models/Dept";
export default class DepartmentsController {
    public async store({ request }: HttpContextContract) {
        const newDeptSchema = schema.create({
            deptName: schema.string(),
            domain: schema.string(),
        });
        const payload = await request.validate({schema: newDeptSchema });
        const dept = await Dept.create(payload);
        return dept;
    }
    public async index() {
        return Dept.all();
    }

    public async update({request, response, params }: HttpContextContract) {
        try {
          const { name } = request.body();
          const dept = await Dept.find(params.id);
          if (!dept) {
            return response.status(404).json({ message: "Dept not found" });
          }
          dept.deptName = name;
          await dept.save();
          return response.json({ message: "Dept name updated successfully" });
        } catch (error) {
          return response.status(500).json({ message: "Internal Server Error" });
        }
      }
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const dept = await Dept.find(params.id);
          if (!dept) {
            return response.status(404).json({ message: "Dept not found" });
          }
          await dept.delete();
          return response.json({ message: "Deleted dept successfully!" });
        } catch (error) {
          return response.status(500).json({ message: "Internal server error" });
        }
      }
    }

