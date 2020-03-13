using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace MyWallet2.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
