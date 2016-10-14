using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using LiveOdiaFinal.Models;
using System.Web.Configuration;

namespace LiveOdiaFinal
{
    public class dbutility
    {
        public static DataTable getAllTopStory()
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM topnews";
                MySqlCommand cmd = new MySqlCommand(query, conn);


                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static DataTable GetHotNewsData()
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM hotnews";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }


        public static DataTable getHotNewsSummaryDetail(int id)
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM hotnews where hnid=" + id;
                MySqlCommand cmd = new MySqlCommand(query, conn);
                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

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
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM newstory where nsid=" + id;
                MySqlCommand cmd = new MySqlCommand(query, conn);
                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static DataTable getAllNewStory()
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM newstory";
                MySqlCommand cmd = new MySqlCommand(query, conn);


                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static DataTable getHotNewsSummary(int id)
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM hotnews WHERE ndid=" + id;
                MySqlCommand cmd = new MySqlCommand(query, conn);
                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static DataTable GetHotNewsTitle()
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM newsdivision";
                MySqlCommand cmd = new MySqlCommand(query, conn);


                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static DataTable getTopNewsById(int id)
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM topnews where tnid=" + id;
                MySqlCommand cmd = new MySqlCommand(query, conn);


                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public static bool addNewCategory(AdminModel value)
        {
            MySqlConnection conn = new MySqlConnection(WebConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            bool res = false;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                conn.Open();
                cmd.CommandText = "INSERT INTO newsdivision (newsdiv) VALUES (@newsdiv)";
                cmd.Parameters.AddWithValue("newsdiv", value.CNAME);
                cmd.Connection = conn;
                cmd.Prepare();
                cmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ex)
            {
                res = false;
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
            Dictionary<string, List<HotNewsModel>> fullNews = new Dictionary<string, List<HotNewsModel>>();
            List<HotNewsModel> _newsData = new List<HotNewsModel>();
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
                            scmd.Parameters.AddWithValue("hnid", lid);
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
    }
}