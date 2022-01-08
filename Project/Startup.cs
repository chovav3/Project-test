using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectBL;
using ProjectDL;
using System;
using System.IO;
using System.Reflection;

namespace Project
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private static void ConfigureSwaggerService(IServiceCollection services)

        {

            services.AddSwaggerGen(c =>

            {

                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo

                {

                    Title = "Project",

                    Version = "v1",

                    Description = "מידע על אוסף הקונטרולים שמסופקים על ידי המערכת "

                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";

                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                c.IncludeXmlComments(xmlPath);

            });

            services.AddSwaggerGenNewtonsoftSupport();

        }

        public void ConfigureSwagger(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "swagger";

                c.SwaggerEndpoint("./v1/swagger.json", "Project.Controllers V1");

                c.DocumentTitle = "Project - swagger";

                c.InjectStylesheet("/Swagger/ui/css/custom.css");

                c.InjectJavascript("/Swagger/ui/script/custom.js");
            });
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureSwaggerService(services);
            services.AddControllersWithViews();
            services.AddScoped(typeof(IUsersBL), typeof(UsersBL));
            services.AddScoped(typeof(IGeneralDL), typeof(GeneralDL));
            services.AddScoped(typeof(IQueuesBL), typeof(QueuesBL));
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            ConfigureSwagger(app);
            app.UseRouting();

            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add(
                    "Content-Security-Policy",
                    "script-src 'self'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' https://img.icons8.com");

                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
