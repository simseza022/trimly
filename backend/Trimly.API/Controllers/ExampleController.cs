using Microsoft.AspNetCore.Mvc;

namespace Trimly.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{

    [HttpGet("{id}")]
    public ActionResult GetExample(int id)
    {
        return Ok("example");
    }
}
