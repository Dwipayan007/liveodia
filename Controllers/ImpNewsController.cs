using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LiveOdiaFinal.Controllers
{
    public class ImpNewsController : ApiController
    {
        // GET: api/ImpNews
        public DataTable Get()
        {
            return dbutility.GetImpNews();
        }

        // GET: api/ImpNews/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImpNews
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ImpNews/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ImpNews/5
        public void Delete(int id)
        {
        }
    }
}
