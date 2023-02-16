using System.Web.Mvc;

namespace CspHeader.Controllers
{
    public class ContentController : Controller
    {
        // GET: Content
        public ActionResult HelloWorld()
        {
            const string text = @"Hello World!!";
            return Json(text, JsonRequestBehavior.AllowGet);
        }
    }
}