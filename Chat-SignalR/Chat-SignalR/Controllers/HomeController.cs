using Chat_SignalR.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Chat_SignalR.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

       

        public IActionResult Index()
        {
            return View();
        }

     
    }
}