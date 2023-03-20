
# Student Course Registration Portal

This web application is for registering open elective course by the students of an university


## API Reference

For API documentation,refer the below link:
https://documenter.getpostman.com/view/25358948/2s93JzMgDn


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET_KEY` HDFJSDLJFIIEROIFSNKD

`DB_LOCAL_URI` mongodb+srv://madskey95:O58Ll0NbFVjkl46V@task2.8rnhav3.mongodb.net/?retryWrites=true&w=majority

## How to use?

1)Clone this repository and start the server.

    Steps to clone the repository in Visual Studio Code:
    
    1)Click Clone git repository on the home page.
    
    2)Copy the repository link from github and paste it over here.
    https://github.com/MadGanGithub/gdsc_task2-backend-only-.git

2)Open Postman app and create new request.

3)First of all,login using admin credentials.(POST request)

{
    "regno":1234,
    "key":"gdscweb@sastra"
}

4)Add users to the database(POST request).

Ex.
{
    "regno":125156072,
    "email":"125156072@sastra.ac.in",
    "password":"testaddusingadmin"
}


5)Login using one of the registered user.(POST request)

Ex.
{
    "regno":125156072,
    "password":"testaddusingadmin"
}

6)Select any one of three options:
  '
  
  #Display all courses:
  
  Ex.
  http://localhost:5001/enter/get/

  #Register a course:
  
  Ex.
  {
    "course":"Laws of Cricket"
}

  #Display registered course:
  
  Ex.
  http://localhost:5001/enter/show/


7)Logout the user.

8)Again login using admin credentials and select any of the four options:

#Delete user:

Ex.
http://localhost:5001/enter/admin/delete/user/:id

Ex.
#Add user:
http://localhost:5001/enter/admin/add/user/

Ex.
#Delete course:
http://localhost:5001/enter/admin/delete/:id

Ex.
#Add course:
http://localhost:5001/enter/admin/add/

{
    "name":"Laws of Cricket",
    "description":"About cricket",
    "mode":"offline",
    "slots":15
}


## Usage/Examples

USER DATA

{
    "regno":125156071,
    "email":"125156071@sastra.ac.in",
    "password":"testaddusingadmin"
}

{
    "regno":125156072,
    "email":"125156072@sastra.ac.in",
    "password":"testaddusingadmin"
}

{
    "regno":125156073,
    "email":"125156073@sastra.ac.in",
    "password":"testaddusingadmin"
}

{
    "regno":125156074,
    "email":"125156074@sastra.ac.in",
    "password":"testaddusingadmin"
}

COURSE DATA

{
    "name":"Laws of Cricket",
    "description":"About cricket",
    "mode":"offline",
    "slots":15
}

{
    "name":"Carnatic Music",
    "description":"About music",
    "mode":"online",
    "slots":20
}

{
    "name":"Saint Composers",
    "description":"About saint composers in India",
    "mode":"offline",
    "slots":17
}

{
    "name":"Forensics",
    "description":"About forensics",
    "mode":"offline",
    "slots":20
}

ADMIN CREDENTIALS

{
    "regno":1234,
    "key":"gdscweb@sastra"
}




9)Logout the admin.
## Tech Stack

**Server:** Node, Express, JWT,
 Body-Parser, Cookie-Parser



## Support

For support, email madhavganesan95@gmail.com

