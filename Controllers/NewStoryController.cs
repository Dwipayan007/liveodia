using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LiveOdiaFinal.Controllers
{
    public class NewStoryController : ApiController
    {
        // GET: api/NewStory
        public DataTable Get()
        {
            return dbutility.getAllNewStory();
        }

        // GET: api/NewStory/5
        public DataTable Get(int id)
        {
            return dbutility.getNewstoryById(id);
        }

        // POST: api/NewStory
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/NewStory/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/NewStory/5
        public bool Delete(int id)
        {
            bool res = false;
            res = dbutility.deleteNewsStory(id);
            return res;
        }
    }
}
