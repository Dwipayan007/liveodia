using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace LiveOdiaFinal
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Application["NoOfVisitors"]=+1;
            dbutility.saveuserVisit(Application["NoOfVisitors"]);
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
        protected void Session_Start() {
            Application.Lock();
            Application["NoOfVisitors"] = (int)Application["NoOfVisitors"] + 1;
            Application.UnLock();
        }
    }
}
