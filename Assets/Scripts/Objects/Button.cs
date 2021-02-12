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
        Debug.Log("Enter: " + col.gameObject);
    }

    private void OnCollisionStay2D(Collision2D col) {
        isActive = true;
        Debug.Log("Stay: " + col.gameObject);
    }

    void OnCollisionExit2D(Collision2D col) {
        isActive = false;
        Debug.Log("Exit: " + col.gameObject);
    }
}
