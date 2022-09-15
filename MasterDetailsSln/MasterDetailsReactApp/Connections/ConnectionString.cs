
public static class ConnectionString
{
    public static string GetConnectionString()
    {
        var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false);
        var configuration = builder.Build();
        string strConnectionString = configuration.GetConnectionString("DefaultConnection");
        return strConnectionString;
    }
}

