namespace MasterDetailsReactApp.ViewModels
{
    public class EnrollmentVM
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string EnrollmentDate { get; set; }
        public string Terms { get; set; }
        public string Courses { get; set; }
    }

    public class EnrollmentAddorUpdateVM
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string EnrollmentDate { get; set; }
        public string Terms { get; set; }
        public List<EnrollmentCoursesVM> Courses { get; set; }
    }
    public class EnrollmentCoursesVM
    {
        public int Id { get; set; }
        public string Course { get; set; }
        public bool IsChecked { get; set; }
    }

}
