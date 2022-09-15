using Dapper;
using MasterDetailsReactApp.ViewModels;
using System.Data.SqlClient;

namespace MasterDetailsReactApp.DataAccessLayer
{
    public class CourseDAL
    {
        internal List<EnrollmentCoursesVM> GetAllCourse()
        {
            List<EnrollmentCoursesVM> courses = new List<EnrollmentCoursesVM>();

            using (var connection = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                var sql = string.Format("SP_Courses_GetAll");

                courses = connection.Query<EnrollmentCoursesVM>(sql).ToList();
            }

            return courses;
        }
    }
}
