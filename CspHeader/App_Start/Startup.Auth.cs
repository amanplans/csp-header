using Owin;
using System.Security.Claims;
using System.Web.Helpers;

namespace CspHeader.Bla
{
    public partial class Startup
    {
        //https://github.com/NWebsec/NWebsec/issues/100
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseCsp(options => options
              .DefaultSources(s => s.Self())
              .ScriptSources(s =>
              {
                  s.Self().CustomSources(
                      "www.youtube.com"
                      ).UnsafeEval().UnsafeInline();
              })
              .StyleSources(s =>
              {
                  s.Self().CustomSources(
                      "fonts.googleapis.com"
                      ); //.UnsafeInline();
              })
              .FontSources(s =>
              {
                  s.Self().CustomSources(
                      "fonts.gstatic.com"
                      );
              })
              .FrameSources(s => { s.Self().CustomSources("*.apg.demdex.net"); })
              .FrameAncestors(s => { s.Self(); })
              );

            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Name;
        }
    }
}