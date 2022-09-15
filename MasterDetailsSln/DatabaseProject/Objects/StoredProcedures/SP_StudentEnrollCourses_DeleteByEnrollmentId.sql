CREATE PROC [dbo].[SP_StudentEnrollCourses_DeleteByEnrollmentId]
(
	@EnrollmentId INT
)
AS
BEGIN
	DELETE FROM [Default].[StudentEnrollCourses] WHERE EnrollmentId = @EnrollmentId
END