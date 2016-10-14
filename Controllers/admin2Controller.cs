using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace LiveOdiaFinal.Controllers
{
    public class admin2Controller : ApiController
    {
        // GET: api/admin2
        public DataTable Get()
        {
            return dbutility.GetHotNewsData();
        }

        // GET: api/admin2/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/admin2
        public async Task<HttpResponseMessage> Post()
        {

            // const string StoragePath = "~/UploadedImage";
            bool res = false;
            Dictionary<string, string> myData = new Dictionary<string, string>();
            string StoragePath = HttpContext.Current.Server.MapPath("~/UploadedImage/");
            if (Request.Content.IsMimeMultipartContent())
            {
                try
                {
                    string fname = "";
                    var streamProvider = new MultipartFormDataStreamProvider(StoragePath);
                    await Request.Content.ReadAsMultipartAsync(streamProvider);
                    foreach (MultipartFileData fileData in streamProvider.FileData)
                    {
                        if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                        {
                            return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                        }
                        string fileName = fileData.Headers.ContentDisposition.FileName;

                        if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                        {
                            fileName = fileName.Trim('"');
                            fname = DateTime.Now.ToString("yyyy_MM_dd_HH_mm_ss") + "_" + fileName;
                            myData.Add("img", fname);
                        }
                        if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                        {
                            fname = Path.GetFileName(fileName);

                        }
                        File.Copy(fileData.LocalFileName, Path.Combine(StoragePath, fname));
                    }
                    foreach (var key in streamProvider.FormData.AllKeys)
                    {
                        foreach (var val in streamProvider.FormData.GetValues(key))
                        {
                            myData.Add(key, val);
                        }
                    }
                    if (streamProvider.FileData.Count == 0)
                    {
                        myData.Add("img", "Default");
                    }
                    myData.Add("todaydate", DateTime.Now.ToString("dd-MM-yyyy"));

                    dbutility.SaveData(myData);
                }
                catch (Exception e)
                {
                    Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
            }



            // Check if the request contains multipart/form-data.
            //if (!Request.Content.IsMimeMultipartContent())
            //{
            //    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            //}

            //string root = HttpContext.Current.Server.MapPath("~/App_Data");
            //var provider = new MultipartFormDataStreamProvider(root);

            //try
            //{
            //    // Read the form data.
            //    await Request.Content.ReadAsMultipartAsync(provider);

            //    // This illustrates how to get the file names.
            //    if (provider.FileData.Count != 0)
            //    {
            //        foreach (MultipartFileData file in provider.FileData)
            //        {
            //            Trace.WriteLine(file.Headers.ContentDisposition.FileName);
            //            Trace.WriteLine("Server file path: " + file.LocalFileName);
            //        }
            //    }
            //    foreach (var key in provider.FormData.AllKeys)
            //    {
            //        foreach (var val in provider.FormData.GetValues(key))
            //        {
            //            Trace.WriteLine(string.Format("{0}: {1}", key, val));
            //        }
            //    }
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}
        }
        // PUT: api/admin2/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/admin2/5
        public void Delete(int id)
        {
        }
    }
}
