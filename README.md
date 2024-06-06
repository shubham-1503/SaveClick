## Overview 🌟

The idea is to create a shared space where any registered user can upload images, and these images are visible to all users. This concept encourages community interaction and sharing.


## Technical Details 🚀
- Developed frontend using React and Tailwind for a responsive and interactive user interface.
- Used DynamoDB for storing user credentials with email as the partition key. DynamoDB offers flexibility and scalability, making it suitable for storing user data where fields might not always be required.
- Used S3 for storing uploaded images. The S3 bucket is publicly accessible to allow users to view and download images without restrictions.
- Used API Gateway to connect AWS Lambda functions with respective endpoints, ensuring seamless integration between frontend and backend.
- Used AWS Lambda to handle the logic for registration, login, image upload, and image retrieval. Lambda is preferred due to its scalability and cost-effectiveness for handling discrete events. Following are the 4 Labmda Function :
   - Register User
      - Checks if the email is unique.
      - Stores the user credentials in DynamoDB.
   - Login User
      - Verifies if the email exists.
      - Checks if the password matches the stored password in DynamoDB.
   - Upload Image Labmda Function
      - Stores the selected image in the S3 bucket with its name, type, and content (encoded in base64).
   - Retrieve Images
      - Fetches all image data from S3.
      - Displays images on the frontend using their respective URLs.


## Screenshots 📸
Below are some screenshots which will give you the overall look and feel of the website

### Login Page
![image](https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/saveclicklogin.png?alt=media&token=76e7d26b-d6e4-40d8-81cf-8883cc9bb4ae)

### Register Page
![image](https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/saveclickregister.png?alt=media&token=e90aef60-d406-489b-8f0d-c6873248aa10)

### Home Page (View all shared images)
![image](https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/saveclickhome.png?alt=media&token=54c1aaff-9839-4534-8292-c7dfea8e367f)

### Home Page (View and Download image)
![image](https://firebasestorage.googleapis.com/v0/b/webt3-8766f.appspot.com/o/saveclickview.png?alt=media&token=90a7f0bc-8284-4220-af4c-688388df9150)

