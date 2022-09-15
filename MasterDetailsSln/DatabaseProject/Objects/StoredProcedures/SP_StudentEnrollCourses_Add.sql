CREATE PROC [dbo].[SP_StudentEnrollCourses_Add]
(
	@CourseId INT,
	@EnrollmentId INT
)
AS
BEGIN
	INSERT INTO [Default].[StudentEnrollCourses]([CourseId],[EnrollmentId]) VALUES(@CourseId, @EnrollmentId)
END