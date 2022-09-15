CREATE PROC [dbo].[SP_Enrollments_GetEnrollById]
(
	@EnrollmentId INT
)
AS
BEGIN
	SELECT 
		 Id 
		,Name StudentName 
		,FORMAT(EnrollmentDate,'dd/MMM/yyyy') EnrollmentDate
		,Terms Terms
	FROM [Default].[Enrollments] ELM
	WHERE Id = @EnrollmentId;

	SELECT * FROM
	(
		SELECT 
			 Id
			,CourseName Course 
			,'true'  IsChecked 
		FROM [Default].[Courses]
		WHERE Id IN(SELECT CourseId FROM [Default].[StudentEnrollCourses] WHERE EnrollmentId = @EnrollmentId)
		UNION ALL
		SELECT 
			 Id
			,CourseName Course 
			,'false'  IsChecked 
		FROM [Default].[Courses]
		WHERE Id NOT IN(SELECT CourseId FROM [Default].[StudentEnrollCourses] WHERE EnrollmentId = @EnrollmentId)
	)tbl ORDER BY Course

END