// import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Agent from "App/Models/Agent";
export default class JoinsController {
  public async result() {
    const a = await Agent.query()
      .join("depts", "agents.dept_id", "=", "depts.id")
      .select("depts.*")
      .select("agents.*");
    const result = a.map((list) => {
        return {
            deptId: list.$original.deptId,
            name: list.$original.name,
            deptName: list.$extras.deptName,
            domain: list.$extras.domain,
        };
    });
    return result;
  }
}
