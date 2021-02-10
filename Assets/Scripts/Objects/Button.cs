using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Button : MonoBehaviour
{
    public bool isActive = false;
    // TODO: Sprite Component

    void FixedUpdate() {
        // TODO: Change Sprite
        if (isActive) {

        }
    }

    void OnCollisionEnter2D(Collision2D col) {
        isActive = true;
    }

    void OnCollisionExit2D(Collision2D col) {
        isActive = false;
    }
}
