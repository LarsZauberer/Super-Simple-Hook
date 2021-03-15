using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HookBehavior : MonoBehaviour
{
    public float shootingSpeed = 100f;
    public Vector2 dir;
    private Rigidbody2D r;
    public bool Hooked = false;
    public GameObject hookedToObj;
    public float pullSpeed = 100f;
    public float xPower = 50f, yPower = 50f;
    public GameObject pullObject;
    public bool allowedToPull = false;
    // Start is called before the first frame update
    void Start()
    {
        r = GetComponent<Rigidbody2D>();
        pullObject = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        GameObject player = GameObject.FindGameObjectWithTag("Player");
        if (!Hooked) {
            r.AddForce(dir*Time.fixedDeltaTime*shootingSpeed, ForceMode2D.Impulse);
        } else {
            Rigidbody2D rb = player.GetComponent<Rigidbody2D>();

            if (!player.GetComponent<Hook>().DoubleMech && allowedToPull) {
                MoveObj();
            }
        }

        if (player.GetComponent<Hook>().bothHooked()) {
            MoveObj();
        }
    }

    private void OnTriggerEnter2D(Collider2D other) {
        if (other.tag == "Targets" || other.tag == "Unstatic") {
            hookedToObj = other.gameObject;
            Hooked = true;
            r.velocity = new Vector2(0, 0);
        } else if (other.tag != "Player" && other.tag != "MainCamera") {
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            Hook h = player.GetComponent<Hook>();
            h.deleteHook();
        }
    }

    private void MoveObj() {
        Debug.Log(pullObject);
        Rigidbody2D rb = pullObject.GetComponent<Rigidbody2D>();
        
        Vector2 forceVector = CalculateDirection(transform.position, pullObject.transform.position);

        Debug.Log(forceVector*Time.fixedDeltaTime*pullSpeed);
        rb.AddForce(forceVector*Time.fixedDeltaTime*pullSpeed, ForceMode2D.Impulse);
    }

    public Vector2 CalculateDirection(Vector3 mouse, Vector3 player) {
        Vector2 vec = new Vector2();
        vec.x = mouse.x-player.x;
        vec.y = mouse.y-player.y;

        vec = vec/vec.magnitude;

        // x, y + power
        vec.x *= xPower;
        vec.y *= yPower;

        return vec;
    }
}
