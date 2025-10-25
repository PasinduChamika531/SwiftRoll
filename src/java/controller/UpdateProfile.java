package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.User_DTO;
import entity.Address;
import entity.City;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "UpdateProfile", urlPatterns = {"/UpdateProfile"})
@MultipartConfig
public class UpdateProfile extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);
        
        
         // Retrieve form parameters
                String firstName = request.getParameter("firstName");
                String lastName = request.getParameter("lastName");
                String mobile = request.getParameter("mobile");
                String line1 = request.getParameter("line1");
                String line2 = request.getParameter("line2");
                String postalCode = request.getParameter("postal_code");
                String citySelect = request.getParameter("city_select");
                String oldPassword = request.getParameter("oldPassword");
                String newPassword = request.getParameter("newPassword");
                
                System.out.println(firstName);
                System.out.println(lastName);

        // Start Hibernate session
        Session session = HibernateUtil.getSessionFactory().openSession();
            Transaction transaction = session.beginTransaction();

            try {
                // Fetch the logged-in user DTO
                User_DTO userDto = (User_DTO) request.getSession().getAttribute("user");
                if (userDto == null) {
                    responseJson.addProperty("message", "User not logged in.");
                    sendResponse(response, gson, responseJson);
                    return;
                }

                // Fetch the User entity
                User user = (User) session.createCriteria(User.class)
                        .add(Restrictions.eq("email", userDto.getEmail()))
                        .uniqueResult();

                if (user == null) {
                    responseJson.addProperty("message", "User not found.");
                    sendResponse(response, gson, responseJson);
                    return;
                }

               
                

                // Input validation
                if (isNullOrEmpty(firstName) || isNullOrEmpty(lastName)) {
                    responseJson.addProperty("message", "First and Last Name are required.");
                    sendResponse(response, gson, responseJson);
                    return;
                }

                // Password validation and update
                if (!isNullOrEmpty(newPassword)) {
                    if (!Validations.isPasswordValid(newPassword)) {
                        responseJson.addProperty("message", "Password must have at least 8 characters and one special character.");
                        sendResponse(response, gson, responseJson);
                        return;
                    }

                    if (isNullOrEmpty(oldPassword) || !oldPassword.equals(user.getPassword())) {
                        responseJson.addProperty("message", "Old password is incorrect.");
                        sendResponse(response, gson, responseJson);
                        return;
                    }

                    user.setPassword(newPassword);
                }

                // Update user details
                user.setFirst_name(firstName);
                user.setLast_name(lastName);

                // Load or create the Address entity
                Address address = (Address) session.createCriteria(Address.class)
                        .add(Restrictions.eq("user", user))
                        .uniqueResult();

                if (address == null) {
                    address = new Address();
                    address.setUser(user);
                }

                City city = (City) session.get(City.class, Integer.parseInt(citySelect));
                address.setFirst_name(firstName);
                address.setLast_name(lastName);
                address.setMobile(mobile);
                address.setLine1(line1);
                address.setLine2(line2);
                address.setPostal_code(postalCode);
                address.setCity(city);

                // Save updates
                session.saveOrUpdate(user);
                session.saveOrUpdate(address);

                // Commit transaction
                transaction.commit();

                // Send success response
                responseJson.addProperty("success", true);
                responseJson.addProperty("message", "Profile updated successfully.");
            } catch (Exception e) {
                // Rollback transaction on error
                if (transaction != null) {
                    transaction.rollback();
                }
                responseJson.addProperty("message", "An error occurred while updating the profile.");
                e.printStackTrace();
            }
        

        sendResponse(response, gson, responseJson);
    }

    private boolean isNullOrEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    private void sendResponse(HttpServletResponse response, Gson gson, JsonObject jsonResponse) throws IOException {
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(jsonResponse));
    }
}
