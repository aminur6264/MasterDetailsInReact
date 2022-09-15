using MasterDetailsReactApp.DataAccessLayer;
using MasterDetailsReactApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MasterDetailsReactApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]/")]
    public class EnrollmentController : ControllerBase
    {
        [HttpGet]
        public List<EnrollmentVM> GetAll()
        {
           return new EnrollmentDAL().GetAllEnrollment();
            
        }
        [HttpPost]
        public IActionResult AddOrUpdate(EnrollmentAddorUpdateVM enrollment)
        {
            new EnrollmentDAL().AddOrUpdate(enrollment);
            return Ok();
        }
        [HttpGet]
        public IActionResult GetEnrollById([FromHeader] int id)
        {
            EnrollmentAddorUpdateVM enrollment = new EnrollmentDAL().GetEnrollById(id);
            
            return Ok(enrollment);
        }
        [HttpGet]
        public IActionResult GetAllCourse()
        {
            List<EnrollmentCoursesVM> courses = new CourseDAL().GetAllCourse();
            
            return Ok(courses);
        }


    }


}
