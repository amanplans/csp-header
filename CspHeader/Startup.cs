using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CspHeader.Bla.Startup))]
namespace CspHeader.Bla
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}