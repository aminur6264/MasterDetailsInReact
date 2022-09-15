CREATE PROC [dbo].[SP_Enrollments_AddOrUpdate]
(
	@Id INT,
	@Name NVARCHAR(100),
	@EnrollmentDate DATETIME,
	@Terms NVARCHAR(50)
)
AS
BEGIN
	IF @Id = 0
	BEGIN
		INSERT INTO [Default].[Enrollments] ([Name] ,[EnrollmentDate] ,[Terms])  VALUES (@Name, @EnrollmentDate, @Terms)
		SELECT @@IDENTITY
	END
	ELSE
	BEGIN
		UPDATE [Default].[Enrollments] SET [Name] = @Name, [EnrollmentDate] = @EnrollmentDate, [Terms] = @Terms WHERE Id = @Id
		SELECT @Id
	END

END