# KoMa Back End API

Base Network API : https://koma-backend-pbqp4lpcmq-as.a.run.app

## Postman Documentation

[API Documentation](https://documenter.getpostman.com/view/25897371/2s93sW9vTF)

## Routes

## Recipes 
 ### Get Random Recipes 
 Path : 
  ```
  /api/v1/recipe/random
  ```
 Method: **GET** \
 Response
  ```json
  {
    "status": "success",
    "message": "Successfully get Recipe in Random Order",
    "data": [
        {
            "id": 1,
            "title": "Best Keto Fresh Celery Lemon Juice",
            "images": [
                "https://tinyurl.com/2p82zzca/0f043d81-2a28-4b78-abaa-71947aeab8c6.png"
            ],
            "calories": 43.021
        },
        {
            "id": 6,
            "title": "Keto 5 Ingredient Banana Bread Waffles",
            "images": [
                "https://tinyurl.com/2p82zzca/02fa263d-2a1e-4ab2-bef0-3860f737cc8e.png"
            ],
            "calories": 130.705
        },
        {
            "id": 9,
            "title": "Keto Avocado Turkey Rollups",
            "images": [
                "https://tinyurl.com/2p82zzca/dc0403cc-ea57-4082-9804-82f2f2171dd7.png"
            ],
            "calories": 152.432
        },
        {
            "id": 5,
            "title": "Low Carb Banana Flour Bread",
            "images": [
                "https://tinyurl.com/2p82zzca/c9231240-34ca-41cc-9ab2-82f5dae9acf0.png"
            ],
            "calories": 139.362
        },
        {
            "id": 8,
            "title": "Keto Scrambled Eggs Plate",
            "images": [
                "https://tinyurl.com/2p82zzca/d3cddf56-bcf2-423c-89ea-fe545d520b19.png"
            ],
            "calories": 558.107
        },
        {
            "id": 3,
            "title": "Keto Mint Sauce",
            "images": [
                "https://tinyurl.com/2p82zzca/c9edc852-1dc9-4a1a-aac0-9a717a7bb0f7.png"
            ],
            "calories": 9.93
        },
        {
            "id": 7,
            "title": "Keto Sweet and Salty Furikake Walnuts",
            "images": [
                "https://tinyurl.com/2p82zzca/3c719065-61c0-45a1-b6f2-b3be119ca8da.png"
            ],
            "calories": 331.393
        },
        {
            "id": 4,
            "title": "Low Carb Kid-Friendly Banana Ice Cream Avocado Pops",
            "images": [
                "https://tinyurl.com/2p82zzca/02b706a9-7d60-4e68-9155-9f7a49a64b14.png"
            ],
            "calories": 55.913
        },
        {
            "id": 2,
            "title": "Keto Ginger Lemon Digestion Shot",
            "images": [
                "https://tinyurl.com/2p82zzca/fc3bf636-7cab-46c2-9715-687937e676d7.png"
            ],
            "calories": 27.514
        }
    ]
}
```

### Get Recipes From Ingredient 
Path :
```
/api/v1/recipe?ingredient=banana
```
Method : **GET** \
Response
```json
{
    {
    "status": "success",
    "message": "Successfully get Recipe by Ingredient",
    "ingredient": "banana",
    "data": [
        {
            "id": 1,
            "title": "Low Carb Kid-Friendly Banana Ice Cream Avocado Pops",
            "images": [
                "https://tinyurl.com/2p82zzca/02b706a9-7d60-4e68-9155-9f7a49a64b14.png"
            ],
            "calories": 55.913
        },
        {
            "id": 2,
            "title": "Low Carb Banana Flour Bread",
            "images": [
                "https://tinyurl.com/2p82zzca/c9231240-34ca-41cc-9ab2-82f5dae9acf0.png"
            ],
            "calories": 139.362
        },
        {
            "id": 3,
            "title": "Keto 5 Ingredient Banana Bread Waffles",
            "images": [
                "https://tinyurl.com/2p82zzca/02fa263d-2a1e-4ab2-bef0-3860f737cc8e.png"
            ],
            "calories": 130.705
        }
    ]
}
```

### Get Recipe By Id
Path: 
```text
api/v1/recipe/:id
```
Method : **GET** \
Response
```json
{
    "status": "success",
    "message": "Successfully get Recipe by Id",
    "data": {
        "id": 2,
        "title": "Low Carb Banana Flour Bread",
        "body": "Low Carb Banana Flour Bread is a great holiday treat! Banana flour is made with green, unripe banana flour. You might be thinking that bananas are not a “low carb” food. However, this flour is a wonderful gluten-free ingredient that has a host of health benefits. Green banana flour has prebiotic effects on the gut because it is full of resistant starch (a gut-friendly fiber). The prebiotics is helpful to feed the probiotics that enter the body. The flavor of banana flour has slight banana and earthy notes with a natural sweetness.\n\n### Are bananas low carb?\n\nPeople tend to label foods “low-carb” versus not; however, all foods can be a part of a low carb diet. It just depends on how you balance the carbs! If you stick to the serving size, Low Carb Banana Flour Bread can be a part of a low carb diet. As mentioned before, green banana flour is made mostly of resistant starch, which has a lower glycemic index. Lower glycemic foods can be a part of a low carb diet.\n\n### Do I need to top the final bread with a fresh banana?\n\nNo, you do not need to top the final bread with a fresh banana. It is mostly there for decoration. However, some people following a Targeted Keto diet may want the additional carbs around workouts. The banana bread would make a great addition to a pre-workout meal paired with healthy fats like nut butter. Feel free to add mashed bananas to the batter!\n\n### Serving suggestion\n\nServe Low Carb Banana Flour Bread with Keto Cream Cheese and Almond Butter Dip https://www.carbmanager.com/recipe/keto-cream-cheese-and-almond-butter-dip but used as a spread.",
        "instructions": "Preheat an oven to 350 F. Line a standard-sized loaf pan with parchment paper that hangs off both long sides of the pan. Spray with nonstick cooking spray. In a medium-sized mixing bowl, combine the dry ingredients, including the green banana flour, kosher salt, baking powder, and Swerve (use the powdered version). Whisk well to combine.",
        "images": [
            "https://tinyurl.com/2p82zzca/c9231240-34ca-41cc-9ab2-82f5dae9acf0.png"
        ],
        "calories": 139.362,
        "listIngredients": [
            {
                "ingredient": "Organic Green Banana Flour by Let's Do Organic",
                "unit": "cup",
                "qty": 0.75,
                "desc": "¾ cup"
            },
            {
                "ingredient": "Coarse Kosher Salt by Morton",
                "unit": "tsp",
                "qty": 0.25,
                "desc": "¼ tsp"
            },
            {
                "ingredient": "The Ultimate Icing Sugar Replacement by Swerve",
                "unit": "cup",
                "qty": 1,
                "desc": "1 cup"
            },
            {
                "ingredient": "Baking Powder",
                "unit": "teaspoon",
                "qty": 1,
                "desc": "1 teaspoon"
            },
            {
                "ingredient": "Raw Egg",
                "unit": "large",
                "qty": 5,
                "desc": "5 large"
            },
            {
                "ingredient": "Banana Extract",
                "unit": "1 tsp",
                "qty": 1,
                "desc": "1 x 1 tsp"
            },
            {
                "ingredient": "Coconut Oil",
                "unit": "cup",
                "qty": 0.333,
                "desc": "⅓ cup"
            },
            {
                "ingredient": "Vanilla Extract",
                "unit": "teaspoon",
                "qty": 1,
                "desc": "1 teaspoon"
            },
            {
                "ingredient": "Almond Milk",
                "unit": "cup",
                "qty": 0.25,
                "desc": "¼ cup"
            },
            {
                "ingredient": "Banana",
                "unit": "medium - 7\" to 7 7/8\" long",
                "qty": 1,
                "desc": "1 medium - 7\" to 7 7/8\" long"
            },
            {
                "ingredient": "Lemon Juice",
                "unit": "teaspoon",
                "qty": 2,
                "desc": "2 teaspoon"
            },
            {
                "ingredient": "The Ultimate Icing Sugar Replacement by Swerve",
                "unit": "cup",
                "qty": 0.5,
                "desc": "½ cup"
            },
            {
                "ingredient": "Almond Milk",
                "unit": "tablespoon",
                "qty": 1.5,
                "desc": "1-½ tablespoon"
            }
        ],
        "createdAt": "2023-06-09T14:05:38.280Z",
        "updatedAt": "2023-06-09T14:05:38.280Z"
    }
}
```

# User

  ### Register User
  Path : 
  ```text
/api/v1/auth/register
```
Method : **POST** \
Body :
```json
  {
    "email": "test2@gmail.com",
    "password": "rootroot", 
    "fullName": "test",
    "gender": "male" 
}
```
Response :
Success :
```json
{
    "status": "success",
    "message": "Successfully register user"
}
```

Failed :
```json
{
    "status": "error",
    "message": "Email already in use"
}
```
```json 
{
    "status": "error",
    "message": "Email already in use"
}
```
```json
{
    "status": "error",
    "message": "\"email\" must be a valid email"
}
```

### Login User

Path : 
```text
/api/v1/auth/login
```
Method : **POST** \
Body :
```json
{
    "email": "test2@gmail.com",
    "password": "rootroot" 
}
```
Response : 
Success :
```json
{
    "status": "success",
    "accessToken": "..."
}
```

Failed :
```json
{
    "status": "success",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYTQzNjUzYjEtMjk2Ni00NDY1LWE0YjktZjRmYmM0OTE3NzVhIiwiaWF0IjoxNjg2MzIxMzQ0LCJleHAiOjE2ODYzMjE2NDR9.mzHMPKXzlOkHpRFAq3Sol5ALtc5TH0l_o4aN4YZxLMA"
}
```

### Get Detail User

Path :
```text
/api/v1/user/detail
```
Method : **GET** \
Authorization : Bearer accessToken

Response :
```json
{
    "status": "sucess",
    "message": "Successfully get Detail User",
    "data": {
        "fullName": "test",
        "email": "test2@gmail.com",
        "gender": "male",
        "height": null,
        "weight": null,
        "calories": null,
        "photoProfile": "https://storage.googleapis.com/koma-profile-images/image-1686723133020",
        "phoneNumber": null
    }
}
```

### Update Profile User

Path :
```text 
/api/v1/user/detail/update
```
Method : **PUT** \
Authorization : Bearer accessToken
Body :
```json
{
    "fullName": "test Update Profile",
    "height": 170,
    "weight": 50,
    "phoneNumber": "085155256000"
}
```
Response :
```json
{
    "status": "success",
    "message": "Successfully Update User"
}
```

Update Profile Image User

Path : 
```text
/api/v1/user/detail/update/photo
```
Method : **PUT** \
Authorization : Bearer accessToken
Body :
file: image

Example : 
![image](https://github.com/Kokonumbawan23/KoMa/assets/86384879/16f953f1-e407-485f-a243-4282a23b0144)

Response :
```json
{
    "status": "success",
    "message": "Successfully Change Photo Profile"
}
```

### Delete Profile Image user

Path :
```
/api/v1/user/detail/update/photo/delete
```
Method : **DELETE** \
Authorization : Bearer accessToken

Response :
```json
{
    "status": "success",
    "message": "Successfully delete Photo"
}
```

### Change Password User

Path :
```text
/api/v1/user/changepassword
```
Method : **POST** \
Authorization : Bearer accessToken
Body :
```json
{
    "oldPassword": "12341234",
    "newPassword": "masukaja",
    "confirmPassword": "masukaja"
}
```
Response :
```json
{
    "status": "succes",
    "message": "Successfully update Password"
}
```


## Reset Password

### Generate OTP

Path : 
```text
/api/v1/user/otpgen
```
Method : **POST** \
Body :
```json
{"email" : "test2@gmail.com"}
```
Response :
```json
{
    "status": "success",
    "message": "Email sended"
}
```

### Verify OTP

Path :
```
/api/v1/user/otpver
```
Method : **POST** \
Body :
```json
{
    "otp": "zTRIq"
}
```
Response :
```json
{
    "status": "success",
    "message": "Otp verified",
    "key": "U2FsdGVkX1/Bwrpu0qDzgwjuy3qp6BYt/t+IPT9AE6vgKTl5M5wVdyFUMNr1KxwTD58o7ccRhuXz81kihHP0vA=="
}
```

### Reset Password

Path :
```
/api/v1/user/resetpassword
```
Method : **POST** \
Body :
```json
{
    "encryptKey" : "U2FsdGVkX1/twT9ll8sSeYIdCieZbtFcVLaLU0vPLNYwwd/T6P16iWvpl8TnqfkRM7U6/FYVTmT9Q8gcLEe1jw==",
    "password" : "abcd1234",
    "confirmPassword" : "abcd1234"
}
```
Response :
```
{
    "status": "success",
    "message": "success update user password"
}
```

  



