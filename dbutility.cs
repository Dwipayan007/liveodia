using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using LiveOdiaFinal.Models;

namespace LiveOdiaFinal
{
    public class dbutility
    {
        public static DataTable getAllTopStory()
        {
            string tdate = DateTime.Now.ToString("dd-MM-yyyy");
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM topnews where newsdate='" + tdate + "'";
                scmd.Parameters.AddWithValue("newsdate", tdate);
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable GetImpNews()
        {
            string tdate = DateTime.Now.ToString("dd-MM-yyyy");
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM impnews where newsdate='" + tdate + "'";
                scmd.Parameters.AddWithValue("newsdate", tdate);
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable getAllNews(AdminModel val)
        {
            string tdate = val.newsdate;
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM topnews where newsdate='" + tdate + "'";
                scmd.Parameters.AddWithValue("newsdate", tdate);
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static bool createPdfName(string pdfname,AdminModel val)
        {    
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            string pdfdate = val.newsdate;
            bool res = false;
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "INSERT INTO newspdf (pdfname, pdfdate) VALUES (@pdfname,@pdfdate)";
                scmd.Parameters.AddWithValue("pdfname", pdfname);
                scmd.Parameters.AddWithValue("pdfdate", pdfdate);
                scmd.Prepare();
                scmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ex)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static bool updateNewsDate(AdminModel newsDate)
        {
            bool res = false;
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            Dictionary<string, List<HotNewsModel>> fullNews = new Dictionary<string, List<HotNewsModel>>();
            List<HotNewsModel> _newsData = new List<HotNewsModel>();
            try
            {
                string newsdt = newsDate.newsdate;
                scmd.CommandText = "Update newstory set newsdate='" + newsdt + "'";
                //scmd.Parameters.AddWithValue("newsdate", newsDate.newsdate);
                scmd.Prepare();
                res = Convert.ToBoolean(scmd.ExecuteNonQuery());
                if (res)
                {
                    scmd.Parameters.Clear();
                    scmd.CommandText = "Update topnews set newsdate='" + newsdt + "'";
                    //scmd.Parameters.AddWithValue("newsdate", newsDate.newsdate);
                    scmd.Prepare();
                    res = Convert.ToBoolean(scmd.ExecuteNonQuery());
                    if (res)
                    {
                        scmd.Parameters.Clear();
                        scmd.CommandText = "Update hotnews set newsdate='" + newsdt + "'";
                        // scmd.Parameters.AddWithValue("newsdate", newsDate.newsdate);
                        scmd.Prepare();
                        res = Convert.ToBoolean(scmd.ExecuteNonQuery());
                    }
                }
                res = true;
            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static bool getLoginData(Login ldata)
        {
            bool res = false;
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            Dictionary<string, List<HotNewsModel>> fullNews = new Dictionary<string, List<HotNewsModel>>();
            List<HotNewsModel> _newsData = new List<HotNewsModel>();
            try
            {
                scmd.CommandText = "SELECT * FROM login WHERE uname='" + ldata.USERNAME + "' AND pword='" + ldata.PASSWORD + "'";
                scmd.Prepare();
                res = Convert.ToBoolean(scmd.ExecuteScalar());

            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static DataTable GetHotNewsData()
        {
            string tdate = DateTime.Now.ToString("dd-MM-yyyy");
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM hotnews where newsdate='" + tdate + "'"; ;
                scmd.Parameters.AddWithValue("newsdate", tdate);
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static bool DeleteAllNews(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            bool res = false;
            int result = 0;
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "TRUNCATE TABLE hotnews";
                scmd.Prepare();
                result = scmd.ExecuteNonQuery();
                if (result == 0)
                {
                    scmd.Parameters.Clear();
                    scmd.CommandText = "TRUNCATE TABLE newstory";
                    scmd.Prepare();
                    result = scmd.ExecuteNonQuery();
                }
                if (result == 0)
                {
                    scmd.Parameters.Clear();
                    scmd.CommandText = "TRUNCATE TABLE topnews";
                    scmd.Prepare();
                    result = scmd.ExecuteNonQuery();
                }
                res = true;
            }
            catch (Exception ex)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static DataTable getHotNewsSummaryDetail(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM hotnews where hnid=" + id;
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static bool deleteHotNews(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            bool res = false;
            try
            {
                scmd.CommandText = "delete from hotnews where hnid=" + id;
                scmd.Parameters.AddWithValue("hnid", id);
                scmd.Prepare();
                scmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static bool deleteNewsStory(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            bool res = false;
            try
            {
                scmd.CommandText = "delete from newstory where nsid=" + id;
                scmd.Parameters.AddWithValue("nsid", id);
                scmd.Prepare();
                scmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static bool deleteTopNews(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            bool res = false;
            try
            {
                scmd.CommandText = "delete from topnews where tnid=" + id;
                scmd.Parameters.AddWithValue("tnid", id);
                scmd.Prepare();
                scmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static DataTable getNewstoryById(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM newstory where nsid=" + id;
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable getAllNewStory()
        {
            string tdate = DateTime.Now.ToString("dd-MM-yyyy");
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM newstory where newsdate='" + tdate + "'";
                scmd.Parameters.AddWithValue("newsdate", tdate);
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable getHotNewsSummary(int id)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM hotnews WHERE ndid=" + id;
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable GetHotNewsTitle()
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM newsdivision";
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static DataTable getTopNewsById(int id)
        {

            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            DataTable dt = new DataTable();
            try
            {
                scon.Open();
                scmd.Connection = scon;
                scmd.CommandText = "SELECT * FROM topnews where tnid=" + id;
                scmd.Prepare();
                dt.Load(scmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return dt;
        }

        public static bool addNewCategory(AdminModel value)
        {
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            bool res = false;
            try
            {
                scon.Open();
                scmd.CommandText = "INSERT INTO newsdivision (newsdiv) VALUES (@newsdiv)";
                scmd.Parameters.AddWithValue("newsdiv", value.CNAME);
                scmd.Connection = scon;
                scmd.Prepare();
                scmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ex)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }

        public static bool SaveData(Dictionary<string, string> valDict)
        {
            bool res = false;
            MySqlConnection scon = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            MySqlCommand scmd = new MySqlCommand();
            scon.Open();
            scmd.Connection = scon;
            try
            {
                foreach (KeyValuePair<string, string> kvp in valDict)
                {
                    if (kvp.Key == "Topnews")
                    {
                        if (valDict.ContainsKey("tsub"))
                        {
                            scmd.CommandText = "INSERT INTO topnews (ttitle,tsub,topnews,timage,newstype,newsdate) VALUES(@ttitle,@tsub,@topnews,@timage,@newstype,@newsdate)";
                            scmd.Parameters.AddWithValue("tsub", valDict["tsub"]);
                        }
                        else
                            scmd.CommandText = "INSERT INTO topnews (ttitle,topnews,timage,newstype,newsdate) VALUES(@ttitle,@topnews,@timage,@newstype,@newsdate)";
                        //scmd.Parameters.AddWithValue("lid", valDict["HotNews"]);
                        scmd.Parameters.AddWithValue("ttitle", valDict["title"]);
                        scmd.Parameters.AddWithValue("newstype", "Topnews");

                        scmd.Parameters.AddWithValue("topnews", valDict["tnews"]);
                        if (valDict["img"] != "")
                        {
                            scmd.Parameters.AddWithValue("timage", valDict["img"]);
                        }
                        else
                            scmd.Parameters.AddWithValue("timage", "No Image");
                        scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                        scmd.Prepare();
                        scmd.ExecuteNonQuery();
                        scmd.Parameters.Clear();
                        if (valDict["img"] != "")
                        {
                            long lid = scmd.LastInsertedId;
                            scmd.CommandText = "INSERT INTO newsimages(imgurl,tnid,newsdate) values (@imgurl,@tnid,@newsdate)";
                            scmd.Parameters.AddWithValue("imgurl", valDict["img"]);
                            scmd.Parameters.AddWithValue("tnid", lid);
                            scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                            scmd.Prepare();
                            scmd.ExecuteNonQuery();
                        }
                        res = true;
                    }

                    if (kvp.Key == "ImpNews")
                    {
                        if (valDict.ContainsKey("isub"))
                        {
                            scmd.CommandText = "INSERT INTO impnews (ititle,isub,impnews,iimage,newstype,newsdate,priority) VALUES(@ititle,@isub,@impnews,@iimage,@newstype,@newsdate,@priority)";
                            scmd.Parameters.AddWithValue("isub", valDict["isub"]);
                        }
                        else
                            scmd.CommandText = "INSERT INTO topnews (ititle,impnews,iimage,newstype,newsdate,priority) VALUES(@ititle,@impnews,@iimage,@newstype,@newsdate,@priority)";
                        //scmd.Parameters.AddWithValue("lid", valDict["HotNews"]);
                        scmd.Parameters.AddWithValue("ititle", valDict["title"]);
                        
                        scmd.Parameters.AddWithValue("newstype", "Impnews");

                        scmd.Parameters.AddWithValue("impnews", valDict["inews"]);
                        if (valDict["img"] != "")
                        {
                            scmd.Parameters.AddWithValue("iimage", valDict["img"]);
                        }
                        else
                            scmd.Parameters.AddWithValue("iimage", "No Image");
                        scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                        scmd.Parameters.AddWithValue("priority", valDict["priority"]);
                        scmd.Prepare();
                        scmd.ExecuteNonQuery();
                        scmd.Parameters.Clear();
                        if (valDict["img"] != "")
                        {
                            long lid = scmd.LastInsertedId;
                            scmd.CommandText = "INSERT INTO newsimages(imgurl,inid,newsdate) values (@imgurl,@inid,@newsdate)";
                            scmd.Parameters.AddWithValue("imgurl", valDict["img"]);
                            scmd.Parameters.AddWithValue("inid", lid);
                            scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                            scmd.Prepare();
                            scmd.ExecuteNonQuery();
                        }
                        res = true;
                    }

                    if (kvp.Key == "hotNews")
                    {
                        if (valDict.ContainsKey("hsub"))
                        {
                            scmd.CommandText = "INSERT INTO hotnews (htitle,hsub,hotnews,himage,newstype,newsdate,ndid) VALUES(@htitle,@hsub,@hotnews,@himage,@newstype,@newsdate,@ndid)";
                            scmd.Parameters.AddWithValue("hsub", valDict["hsub"]);
                        }
                        else
                        {
                            scmd.CommandText = "INSERT INTO hotnews (htitle,hotnews,himage,newstype,newsdate,ndid) VALUES(@htitle,@hotnews,@himage,@newstype,@newsdate,@ndid)";
                        }
                        scmd.Parameters.AddWithValue("htitle", valDict["title"]);
                        scmd.Parameters.AddWithValue("hotnews", valDict["hfullNews"]);
                        scmd.Parameters.AddWithValue("ndid", valDict["selOption"]);
                        scmd.Parameters.AddWithValue("newstype", "hotNews");
                        if (valDict["img"] != "")
                        {
                            scmd.Parameters.AddWithValue("himage", valDict["img"]);
                        }
                        else
                            scmd.Parameters.AddWithValue("himage", "No Image");
                        scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                        scmd.Prepare();
                        scmd.ExecuteNonQuery();
                        scmd.Parameters.Clear();
                        if (valDict["img"] != "")
                        {
                            long lid = scmd.LastInsertedId;
                            scmd.CommandText = "INSERT INTO newsimages(imgurl,hnid,newsdate) values (@imgurl,@hnid,@newsdate)";
                            scmd.Parameters.AddWithValue("imgurl", valDict["img"]);
                            scmd.Parameters.AddWithValue("inid", lid);
                            scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                            scmd.Prepare();
                            scmd.ExecuteNonQuery();
                        }
                        res = true;
                    }
                    if (kvp.Key == "Newstory")
                    {

                        if (valDict.ContainsKey("nsub"))
                        {
                            scmd.CommandText = "INSERT INTO newstory (ntitle,nsub,newstory,nimage,newstype,newsdate) VALUES(@ntitle,@nsub,@newstory,@nimage,@newstype,@newsdate)";
                            scmd.Parameters.AddWithValue("nsub", valDict["nsub"]);
                        }
                        else
                            scmd.CommandText = "INSERT INTO newstory (ntitle,newstory,nimage,newstype,newsdate) VALUES(@ntitle,@newstory,@nimage,@newstype,@newsdate)";
                        scmd.Parameters.AddWithValue("ntitle", valDict["title"]);
                        scmd.Parameters.AddWithValue("newstory", valDict["nstory"]);
                        scmd.Parameters.AddWithValue("newstype", "Newstory");
                        if (valDict["img"] != "")
                        {
                            scmd.Parameters.AddWithValue("nimage", valDict["img"]);
                        }
                        else
                            scmd.Parameters.AddWithValue("nimage", "No Image");
                        scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                        scmd.Prepare();
                        scmd.ExecuteNonQuery();
                        scmd.Parameters.Clear();
                        if (valDict["img"] != "")
                        {
                            long lid = scmd.LastInsertedId;
                            scmd.CommandText = "INSERT INTO newsimages(imgurl,nsid,newsdate) values (@imgurl,@nsid,@newsdate)";
                            scmd.Parameters.AddWithValue("imgurl", valDict["img"]);
                            scmd.Parameters.AddWithValue("nsid", lid);
                            scmd.Parameters.AddWithValue("newsdate", valDict["todaydate"]);
                            scmd.Prepare();
                            scmd.ExecuteNonQuery();
                        }
                        res = true;
                    }
                }
            }
            catch (Exception ee)
            {
                res = false;
            }
            finally
            {
                if (scmd != null)
                    scmd.Dispose();
                if (scon.State == ConnectionState.Open)
                {
                    scon.Dispose();
                    scon.Close();
                }
            }
            return res;
        }
    }
}