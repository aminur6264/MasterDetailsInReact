using Dapper;
using MasterDetailsReactApp.Models;
using MasterDetailsReactApp.ViewModels;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace MasterDetailsReactApp.DataAccessLayer
{
    public class EnrollmentDAL
    {
        internal void AddOrUpdate(EnrollmentAddorUpdateVM enrollment)
        {
            using (var connection = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        var sql = string.Format("SP_Enrollments_AddOrUpdate @Id, @Name, @EnrollmentDate, @Terms");
                        var dynamicParameters = new DynamicParameters();
                        dynamicParameters.Add("@Id", enrollment.Id);
                        dynamicParameters.Add("@Name", enrollment.StudentName);
                        dynamicParameters.Add("@EnrollmentDate", enrollment.EnrollmentDate);
                        dynamicParameters.Add("@Terms", enrollment.Terms);
                        int enrollmentId = connection.Query<int>(sql, dynamicParameters, transaction).FirstOrDefault();


                        string deleteQuery = string.Format("SP_StudentEnrollCourses_DeleteByEnrollmentId @EnrollmentId", enrollmentId);
                        var deleteDynamicParameters = new DynamicParameters();
                        deleteDynamicParameters.Add("@EnrollmentId", enrollmentId);
                        connection.Execute(deleteQuery, deleteDynamicParameters, transaction);

                        foreach (EnrollmentCoursesVM course in enrollment.Courses)
                        {
                            if (course.IsChecked)
                            {
                                string addEnrollCoursesQuery = string.Format("SP_StudentEnrollCourses_Add @CourseId, @EnrollmentId", course.Id, enrollmentId);
                                var addEnrollCoursesParameters = new DynamicParameters();
                                addEnrollCoursesParameters.Add("@CourseId", course.Id);
                                addEnrollCoursesParameters.Add("@EnrollmentId", enrollmentId);
                                connection.Execute(addEnrollCoursesQuery, addEnrollCoursesParameters, transaction);
                            }
                        }

                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                    }
                }
                    
            }
        }

        internal List<EnrollmentVM> GetAllEnrollment()
        {
            using (var connection = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                var sql = string.Format("SP_Enrollments_GetAll");

                return connection.Query<EnrollmentVM>(sql).ToList();
            }
        }

        internal EnrollmentAddorUpdateVM GetEnrollById(int id)
        {
            EnrollmentAddorUpdateVM enrollment = new EnrollmentAddorUpdateVM();
            try
            {
                using (var connection = new SqlConnection(ConnectionString.GetConnectionString()))
                {
                    var sql = string.Format("SP_Enrollments_GetEnrollById @EnrollmentId", id);
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@EnrollmentId", id);
                    var multi = connection.QueryMultiple(sql, dynamicParameters);

                    enrollment = multi.Read<EnrollmentAddorUpdateVM>().FirstOrDefault();
                    enrollment.Courses = multi.Read<EnrollmentCoursesVM>().ToList();


                    //enrollment = connection.Query<EnrollmentAddorUpdateVM>(sql, dynamicParameters).FirstOrDefault();
                }
            }
            catch (Exception)
            {

            }
            return enrollment;
        }
    }
}
