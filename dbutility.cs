using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using LiveodiaFinal.Models;
using System.Web.Configuration;

namespace LiveodiaFinal
{
    public class dbutility
    {
        public static DataTable getAllTopStory()
        {
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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

        public static DataTable getHotNewsSummaryDetail(int id)
        {
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
                string query = "SELECT * FROM hotnews where hnid="+id;
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
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

        public static void SaveData(Dictionary<string, object> myData)
        {
            MySqlConnection conn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MyLocalDb"].ConnectionString);
            bool res = false;
            try
            {

                foreach (var key in myData)
                {

                }

                MySqlCommand cmd = new MySqlCommand();
                conn.Open();
                cmd.CommandText = "INSERT INTO newsdivision (newsdiv) VALUES (@newsdiv)";
                cmd.Parameters.AddWithValue("newsdiv", myData.Keys);
                cmd.Connection = conn;
                cmd.Prepare();
                cmd.ExecuteNonQuery();
                res = true;
            }
            catch (Exception ex)
            {
                res = false;
            }
        }
    }
}