namespace MasterDetailsReactApp.Models
{
    public class StudentEnrollment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Terms { get; set; }
    }

    public class EnrollCourses
    {
        public int Id { get; set; }
        public int EnrollmentId { get; set; }
        public int CourseId { get; set; }
    }
    public class Terms
    {
        public int Id { get; set; }
        public string TermsName { get; set; }   
    }
    public class Courses
    {
        public int Id { get; set; }
        public string CourseName { get; set; }

    }
}
