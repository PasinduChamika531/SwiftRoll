
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@MultipartConfig
@WebServlet(name = "check", urlPatterns = {"/check"})
public class check extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

            String name = "pasindu";
            String email = "check@gmail.com";
            
            request.getServletContext().setAttribute("name", name);
            request.getServletContext().setAttribute("email", email);
            
    }
    
    

}
