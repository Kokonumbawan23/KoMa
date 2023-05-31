package com.example.koma.router

sealed class  Router(val router: String) {
    object TakePicture : Router("take_picture")
    object Gallery : Router("gallery")
}