using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Hook : MonoBehaviour
{
    private Vector3 mousePoint;
    public Vector2 dir;
    public GameObject hook;
    public GameObject obj;
    public float shootingSpeed = 10f;
    // Start is called before the first frame update
    void Start()
    {
        Update();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetButtonDown("Fire1")) {
            Shoot();
        }
    }

    private void FixedUpdate() {
        if (obj) {
            Rigidbody2D r = obj.GetComponent<Rigidbody2D>();
            // r.isKinematic = false;
            r.AddForce(CalculateDirection(mousePoint, transform.position)*Time.fixedDeltaTime*shootingSpeed, ForceMode2D.Impulse);
            // r.AddForce(GravityVector, ForceMode2D.Impulse);
        }
    }

    public void Shoot() {
        mousePoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        obj = Instantiate(hook) as GameObject;
        obj.transform.position = transform.position;
    }

    public Vector2 CalculateDirection(Vector3 mouse, Vector3 player) {
        Vector2 vec = new Vector2();
        vec.x = mouse.x-player.x;
        vec.y = mouse.y-player.y;

        vec = vec/vec.magnitude;

        return vec;
    }
}
