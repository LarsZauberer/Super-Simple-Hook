﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using QFSW.QC;

public class Hook : MonoBehaviour
{
    private Vector3 mousePoint;
    public GameObject hook;
    public GameObject obj;

    void Update()
    {
        if (Input.GetButtonDown("Fire1")) {
            Shoot();
        }
    }

    public void Shoot() {
        if (obj) {
            Destroy(obj);
        }
        mousePoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        obj = Instantiate(hook) as GameObject;
        obj.transform.position = transform.position;
        HookBehavior hb = obj.GetComponent<HookBehavior>();
        hb.dir = CalculateDirection(mousePoint, transform.position);
    }

    public Vector2 CalculateDirection(Vector3 mouse, Vector3 player) {
        Vector2 vec = new Vector2();
        vec.x = mouse.x-player.x;
        vec.y = mouse.y-player.y;

        vec = vec/vec.magnitude;

        return vec;
    }

    [Command()]
    public void deleteHook() {
        Destroy(obj);
    }
}
