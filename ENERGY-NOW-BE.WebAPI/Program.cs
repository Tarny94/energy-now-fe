using Microsoft.EntityFrameworkCore; 
using ENERGY_NOW_BE.Infrastructure;
using Microsoft.AspNetCore.Identity;
using ENERGY_NOW_BE.Application.Auth;
using ENERGY_NOW_BE.Core.Entity;
using ENERGY_NOW_BE.Core.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IAuthenticationService,AuthenticationService>();
builder.Services.AddScoped<UserRepository>();

// Role-Based Authorization
builder.Services.AddAuthorization(
//    options =>
//{
//    // Admin can access everything
//    options.AddPolicy("AdminAccess", policy => policy.RequireRole("ADMIN"));

//    // Client can access both Client and User resources
//    options.AddPolicy("ClientAccess", policy =>
//        policy.RequireAssertion(context =>
//            context.User.IsInRole("CLIENT") || context.User.IsInRole("USER")));

//    // User can access only User resources
//    options.AddPolicy("UserAccess", policy => policy.RequireRole("USER"));
//}
);

var connectionString = builder.Configuration.GetConnectionString("DevConnection");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Override default User validation logic
    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<User>();

// Use Authentication and Authorization
app.UseHttpsRedirection();
app.UseAuthentication();  // Enable JWT Authentication
app.UseAuthorization();   // Enable Role-based Authorization

app.MapControllers();

app.Run();