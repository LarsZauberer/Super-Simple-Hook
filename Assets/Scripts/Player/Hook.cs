using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Hook : MonoBehaviour
{
    private Vector3 mousePoint;
    public GameObject hook;

    void Update()
    {
        if (Input.GetButtonDown("Fire1")) {
            Shoot();
        }
    }

    public void Shoot() {
        mousePoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        GameObject obj = Instantiate(hook) as GameObject;
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
}
