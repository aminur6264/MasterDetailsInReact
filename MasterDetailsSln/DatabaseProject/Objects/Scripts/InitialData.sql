/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


IF NOT EXISTS (SELECT * FROM [Default].[Courses])
BEGIN
	SET IDENTITY_INSERT [Default].[Courses] ON 
	INSERT [Default].[Courses] ([Id], [CourseName]) VALUES (1, N'101'),(2, N'102'),(3, N'103'),(4, N'104'),(5, N'105'),(6, N'201'), (7, N'202'),(8, N'203'),(9, N'204'),(10, N'205'),(11, N'301'),(12, N'302'),(13, N'303'),(14, N'304'),(15, N'305')
	SET IDENTITY_INSERT [Default].[Courses] OFF;
END




IF NOT EXISTS (SELECT * FROM [Default].[Enrollments])
BEGIN
	SET IDENTITY_INSERT [Default].[Enrollments] ON 
	INSERT [Default].[Enrollments] ([Id], [Name], [EnrollmentDate], [Terms]) VALUES (3, N'Aminur Rahman', CAST(N'2022-09-02T00:00:00.000' AS DateTime), N'1-2'),(4, N'Nahid Al Fuad', CAST(N'2022-09-02T00:00:00.000' AS DateTime), N'1-2'),(5, N'Zasim Sarkar', CAST(N'2022-09-02T00:00:00.000' AS DateTime), N'1-2'),(6, N'Arifur Rahman', CAST(N'2022-09-25T18:00:00.000' AS DateTime), N'2-1')
	SET IDENTITY_INSERT [Default].[Enrollments] OFF
END
GO



IF NOT EXISTS (SELECT * FROM [Default].[StudentEnrollCourses])
BEGIN
	SET IDENTITY_INSERT [Default].[StudentEnrollCourses] ON 
	INSERT [Default].[StudentEnrollCourses] ([Id], [EnrollmentId], [CourseId]) VALUES (73, 4, 1),(74, 4, 2),(75, 4, 3),(76, 4, 4),(77, 4, 5),(78, 4, 6),(79, 4, 7),(80, 4, 8),(81, 4, 10),(82, 4, 11),(83, 4, 12),(84, 4, 14),(85, 4, 15),(86, 3, 1),(87, 3, 2),(88, 3, 3),(89, 3, 4),(90, 3, 5),(91, 3, 6),(92, 3, 7),(93, 3, 8),(94, 3, 12),(98, 5, 4),(99, 5, 8),(100, 5, 11),(101, 5, 12),(102, 5, 15)
	SET IDENTITY_INSERT [Default].[StudentEnrollCourses] OFF
END
GO