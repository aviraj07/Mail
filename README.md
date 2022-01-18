# Mail
It is a webapp that lets people send and receive emails.

<br>
<a href="https://avimail.herokuapp.com/">See it in action.</a>

## Installation
- You need to have **Django** installed on your local machine.
- Download this zip code.
- Go into this project's directory and run `python(or python3) manage.py runserver`.
- You'll be able to run the application.
- To install django on your machine, [click here](https://docs.djangoproject.com/en/3.2/topics/install/).
- To link database to your webapp run `python(or python3) manage.py makemigrations auctions` and then `python(or python3) manage.py migrate`.

## Usage
- After running the application, you need to register (if you're new a user) to use the webapp.
- Then the index page will load the inbox section which contains all the mails you received. The mails with the grey colour signifies that it isn't been read by the user and the mails with the white background says that the mail has been read.
- You have the option to compose mails by clicking the **Compose** button.
- Clicking on any mail which let you reply or archive/unarchive it.
- The **Sent** section will show all the mails you sent..

## Structure/Design of program
This is a real time chat app. It is coded in Django and Javascript. HTML and CSS are used for styling and layout purposes.
<br>
Main files:
<br>
* *manage.py* - It contains all the required configurations to run your webapp.
* *mail/static* - It includes the required styling css page and javascript to help user to have a good experience of the webapp.
* *mail/templates* - These include all the html pages of the webapp from a basic layout file to each and every html page of the webapp.
* *mail/models.py* - It contains all the database tables that django will handle to store information in it. The **Email** model will store all the mails in it and will user to retrieve them.
* *mail/views.py* - It contains all the logic behind rendering the required pages upon request and acting as a mediator between databse and user. 
* *mail/urls.py* - It has all the urls that a user can request to visit the pages of the webapp.

There are other supporting files as well.


![Preview](./ezgif.com-gif-maker(1).gif)


