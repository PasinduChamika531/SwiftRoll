package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.Address;
import entity.City;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadUserData", urlPatterns = {"/LoadUserData"})
public class LoadUserData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);

        Session session = HibernateUtil.getSessionFactory().openSession();

        User_DTO user_dto = (User_DTO) request.getSession().getAttribute("user");

        Criteria criteriaUser = session.createCriteria(User.class);
        criteriaUser.add(Restrictions.eq("email", user_dto.getEmail()));
        User user = (User) criteriaUser.uniqueResult();

        //City city = (City) session.load(City.class, Integer.parseInt(city_select));

        Criteria criteriaAddress = session.createCriteria(Address.class);
        criteriaAddress.add(Restrictions.eq("user",user));
        
        Address addressUser = (Address) criteriaAddress.uniqueResult();
        
        Criteria criteriaCity = session.createCriteria(City.class);
        List<City> citylist = criteriaCity.list();

      

        responseJson.addProperty("success", true);
        responseJson.addProperty("message", "Update Complete");
        responseJson.add("user", gson.toJsonTree(user_dto));
        responseJson.add("address", gson.toJsonTree(addressUser));
        responseJson.add("citylist", gson.toJsonTree(citylist));

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJson));

    }

}
