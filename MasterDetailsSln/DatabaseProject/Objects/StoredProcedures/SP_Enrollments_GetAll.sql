CREATE PROC [dbo].[SP_Enrollments_GetAll]
AS
BEGIN
	SELECT [Id]
		  ,[Name] StudentName
		  ,FORMAT([EnrollmentDate],'dd/MMM/yyyy') EnrollmentDate
		  ,[Terms]
		  ,(
			SELECT 
				STUFF((SELECT ',' + curse.CourseName 
			FROM [Default].[Courses] curse  
			JOIN [Default].[StudentEnrollCourses] SEC ON SEC.CourseId = curse.Id
			WHERE SEC.EnrollmentId = ELM.Id
			GROUP BY curse.CourseName FOR XML PATH(''), TYPE).value('text()[1]','NVARCHAR(max)'), 1, LEN(','), '')
		   ) Courses
	  FROM [Default].[Enrollments] ELM
END