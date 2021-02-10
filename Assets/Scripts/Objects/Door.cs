using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    private GameObject[] btns;
    private Vector2 startPos;
    public float openHeight = 5;
    public float openingSpeed = 1;
    void Start()
    {
        btns = GameObject.FindGameObjectsWithTag("Button");
        startPos = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        bool active = true;
        for (int i = 0; i < btns.Length; i++)
        {
            if (btns[i].GetComponent<Button>().isActive != true) {
                active = false;
            }
        }

        if (active) {
            open();
        } else {
            close();
        }
    }

    void open() {
        if (transform.position.y < startPos.y + openHeight) {
            transform.position = new Vector3(startPos.x, transform.position.y + openingSpeed * Time.fixedDeltaTime, 0);
        }
    }

    void close() {
        if (transform.position.y >= startPos.y) {
            transform.position = new Vector3(startPos.x, transform.position.y - openingSpeed * Time.fixedDeltaTime, 0);
        }
    }
}
