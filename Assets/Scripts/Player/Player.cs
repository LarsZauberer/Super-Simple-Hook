﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public CharacterController2D controller;
    public float runSpeed = 40f;
    public GameObject camObj;
    Vector2 camStartPos;
    float horizontalMove = 0f;
    bool jump = false;

    void Start() {
        camStartPos = camObj.transform.position;
    }

    void Update()
    {
        horizontalMove = Input.GetAxisRaw("Horizontal") * runSpeed;

        if (Input.GetButtonDown("Jump")) {
            jump = true;
        }
    }

    void FixedUpdate() {
        controller.Move(horizontalMove * Time.fixedDeltaTime, false, jump);
        jump = false;

        camFollow();
    }

    void camFollow() {
        if (camStartPos.x < transform.position.x) {
            camObj.transform.position = new Vector3(transform.position.x, camObj.transform.position.y, -10);
        }
    }
}
