using Microsoft.EntityFrameworkCore; // Add this using directive to resolve the Pomelo namespace
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using ENERGY_NOW_BE.Infrastructure;
using ENERGY_NOW_BE.Application.Auth;
using ENERGY_NOW_BE.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserService>(); // Register UserService
builder.Services.AddScoped<IUserRepository, UserRepository>();

// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Role-Based Authorization
builder.Services.AddAuthorization(options =>
{
    // Admin can access everything
    options.AddPolicy("AdminAccess", policy => policy.RequireRole("ADMIN"));

    // Client can access both Client and User resources
    options.AddPolicy("ClientAccess", policy =>
        policy.RequireAssertion(context =>
            context.User.IsInRole("CLIENT") || context.User.IsInRole("USER")));

    // User can access only User resources
    options.AddPolicy("UserAccess", policy => policy.RequireRole("USER"));
});

// Add Swagger and configure to support JWT authentication
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var connectionString = builder.Configuration.GetConnectionString("DevConnection");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use Authentication and Authorization
app.UseHttpsRedirection();
app.UseAuthentication();  // Enable JWT Authentication
app.UseAuthorization();   // Enable Role-based Authorization

app.MapControllers();

// Example endpoint protected by "AdminAccess" policy
app.MapGet("/admin-resource", [Authorize(Policy = "AdminAccess")] () =>
{
    return Results.Ok("This is an Admin-specific resource.");
});

// Example endpoint protected by "ClientAccess" policy
app.MapGet("/client-or-user-resource", [Authorize(Policy = "ClientAccess")] () =>
{
    return Results.Ok("This is a resource for Clients and Users.");
});

// Example endpoint protected by "UserAccess" policy
app.MapGet("/user-resource", [Authorize(Policy = "UserAccess")] () =>
{
    return Results.Ok("This is a User-specific resource.");
});

app.Run();