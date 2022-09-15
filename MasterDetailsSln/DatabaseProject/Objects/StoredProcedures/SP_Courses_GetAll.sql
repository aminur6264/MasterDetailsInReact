CREATE PROC SP_Courses_GetAll
AS
BEGIN
	SELECT [Id],[CourseName] Course, 'false' IsChecked FROM [Default].[Courses]
END