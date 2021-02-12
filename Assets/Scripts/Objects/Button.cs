using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Button : MonoBehaviour
{
    public bool isActive = false;
    public SpriteRenderer spriteRenderer;
    public Sprite spriteOff;
    public Sprite spriteOn;

    void FixedUpdate() {
        if (isActive) {
            spriteRenderer.sprite = spriteOn;
        } else {
            spriteRenderer.sprite = spriteOff;
        }
    }

    void OnCollisionEnter2D(Collision2D col) {
        isActive = true;
    }

    private void OnCollisionStay2D(Collision2D col) {
        isActive = true;
    }

    void OnCollisionExit2D(Collision2D col) {
        isActive = false;
    }
}
