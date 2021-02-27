using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HookBehavior : MonoBehaviour
{
    public float shootingSpeed = 20f;
    public Vector2 dir;
    private Rigidbody2D r;
    // Start is called before the first frame update
    void Start()
    {
        r = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        r.AddForce(dir*Time.fixedDeltaTime*shootingSpeed, ForceMode2D.Impulse);
    }

    private void OnTriggerEnter2D(Collider2D other) {
        if (other.tag == "Targets") {
            Destroy(gameObject);
        }
    }
}
