# Chat Apps - Backend

## Run Locally

Clone the project

```bash
  git clone https://github.com/Rdhwnzaki/Backend-Telegram.git
```

Go to the project directory

```bash
  cd Backend-Telegram
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
Start the server

```body
DB_USER=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=

JWT_KEY=
PORT=
HOST =

PHOTO_NAME=
PHOTO_KEY=
PHOTO_SECRET=

MAIL_USERNAME=
MAIL_PASSWORD=
OAUTH_CLIENTID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
```

## API Reference

### Users

#### Login

```http
  POST /users/login
```

#### Body

```body
{
    "email_user": "ridhwanzaki177@gmail.com",
    "password_user": "ridhwan123"
}
```

#### Register

```http
  POST /users/register
```

#### Body

```body
{
    "email_user": "ridhwanzaki177@gmail.com",
    "password_user": "ridhwan123",
    "name_user": "ridhwan"
}
```

#### Verification

```http
  POST /users/verif
```

#### Body

```body
{
    "email_user":"ridhwanzaki177@gmail.com",
    "otp":"862454"
}
```

#### Profile

```http
  GET /users/detail-user
```

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "9d643d80-befa-4ed4-a483-f035e3327e0c",
            "email_user": "ridhwanzaki177@gmail.com",
            "password_user": "$2a$10$eCVQWa/JXB8gmAJUSxsC7u43PrHZcS3mL3nNlT37m3fPpB8LVSOR.",
            "name_user": "Ridhwan",
            "photo": "http://res.cloudinary.com/dtvq0fxfo/image/upload/v1674311920/food/trgmt50m6jwqhqdlkywz.png",
            "otp": "113355",
            "verif": 1,
            "username": "rdhwanzakiii",
            "bio": "Hai tele baru",
            "phone_number": "89432563"
        }
    ],
    "message": "Get Detail User Success"
}
```

#### Update Profile

```http
  PUT /users/update-user
```

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": {
        "username": "_rdhwnzaki",
        "bio": "hai",
        "phone_number": "08725433334",
        "photo": "http://res.cloudinary.com/dtvq0fxfo/image/upload/v1674313050/food/krsfbipsurhitluvzkik.png"
    },
    "message": "Update Profile Success"
}
```

#### All User

```http
  GET /users/get-user
```

#### Body

```body
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "id_user": "424c6076-2719-45ca-a0f5-432951b24917",
            "email_user": "ridhwanzaki@gmail.com",
            "password_user": "$2a$10$TboXRz42/Ccfx1c/lWKaTOMT0J3ijRfwNO0Rc1N9bikpAAGjWpLbW",
            "name_user": "Hayabusa",
            "photo": "http://res.cloudinary.com/dtvq0fxfo/image/upload/v1674224150/food/sqlnl0ecczgfdjpmg0ue.png",
            "otp": "931118",
            "verif": 1,
            "username": "hayabusa10",
            "bio": "Ninja",
            "phone_number": "9832546234"
        },
        {
            "id_user": "9d643d80-befa-4ed4-a483-f035e3327e0c",
            "email_user": "ridhwanzaki177@gmail.com",
            "password_user": "$2a$10$eCVQWa/JXB8gmAJUSxsC7u43PrHZcS3mL3nNlT37m3fPpB8LVSOR.",
            "name_user": "Ridhwan",
            "photo": "http://res.cloudinary.com/dtvq0fxfo/image/upload/v1674313050/food/krsfbipsurhitluvzkik.png",
            "otp": "113355",
            "verif": 1,
            "username": "_rdhwnzaki",
            "bio": "hai",
            "phone_number": "8725433334"
        }
    ],
    "message": "Get User Success"
}
```
