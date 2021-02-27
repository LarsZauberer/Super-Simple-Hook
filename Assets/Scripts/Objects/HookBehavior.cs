using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HookBehavior : MonoBehaviour
{
    public float shootingSpeed = 20f;
    public Vector2 dir;
    private Rigidbody2D r;
    public bool Hooked = false;
    // Start is called before the first frame update
    void Start()
    {
        r = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        if (!Hooked) {
            r.AddForce(dir*Time.fixedDeltaTime*shootingSpeed, ForceMode2D.Impulse);
        }
    }

    private void OnTriggerEnter2D(Collider2D other) {
        if (other.tag == "Targets") {
            Hooked = true;
            r.velocity = new Vector2(0, 0);
        } else if (other.tag != "Player" && other.tag != "MainCamera") {
            Destroy(gameObject);
        }
    }
}
