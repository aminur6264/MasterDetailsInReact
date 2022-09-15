CREATE TABLE [Default].[Enrollments]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name] NVARCHAR(100),
	[EnrollmentDate] DATETIME,
	[Terms] NVARCHAR(50)
)
