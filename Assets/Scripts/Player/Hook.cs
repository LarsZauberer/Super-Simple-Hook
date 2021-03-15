using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using QFSW.QC;

public class Hook : MonoBehaviour
{
    private Vector3 mousePoint;
    public GameObject hookPrefab;
    public GameObject hook1;
    public GameObject hook2;
    public bool DoubleMech = false;

    void Update()
    {
        if (Input.GetButtonDown("Fire1")) {
            Shoot();
        } else if (Input.GetButtonUp("Fire1") && hook1) {
            HookBehavior hb = hook1.GetComponent<HookBehavior>();
            if (hb.Hooked) {
                DoubleMech = true;
                ShootSecondHook();
            } else {
                hb.allowedToPull = true;
            }
        }

        if (bothHooked()) {
            setNewObj();
        }
    }

    public void Shoot() {
        DoubleMech = false;
        if (hook1) {
            deleteHook();
        }
        mousePoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        hook1 = Instantiate(hookPrefab) as GameObject;
        hook1.transform.position = transform.position;
        HookBehavior hb = hook1.GetComponent<HookBehavior>();
        hb.dir = CalculateDirection(mousePoint, transform.position);
    }

    public void ShootSecondHook() {
        HookBehavior hb1 = hook1.GetComponent<HookBehavior>();

        // Create second hook
        mousePoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        hook2 = Instantiate(hookPrefab) as GameObject;
        hook2.transform.position = transform.position;
        HookBehavior hb2 = hook2.GetComponent<HookBehavior>();
        hb2.dir = CalculateDirection(mousePoint, transform.position);
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
        Rigidbody2D playerRb = GameObject.FindGameObjectWithTag("Player").GetComponent<Rigidbody2D>();
        playerRb.gravityScale = 3f;
        Destroy(hook1);
        Destroy(hook2);
    }

    private void OnCollisionEnter2D(Collision2D other) {
        if (other.gameObject.tag == "Targets") {
            deleteHook();
        }
    }

    public bool bothHooked() {
        if (!DoubleMech) {
            return false;
        }

        HookBehavior hb1 = hook1.GetComponent<HookBehavior>();
        HookBehavior hb2 = hook2.GetComponent<HookBehavior>();

        return hb1.Hooked && hb2.Hooked;
    }

    public void setNewObj() {
        // Set each others
        HookBehavior hb1 = hook1.GetComponent<HookBehavior>();
        HookBehavior hb2 = hook2.GetComponent<HookBehavior>();

        hb1.pullObject = hb2.hookedToObj;
        hb2.pullObject = hb1.hookedToObj;
    }
}
